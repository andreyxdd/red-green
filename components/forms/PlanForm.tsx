/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDays } from 'date-fns';

import { useNavigation } from '@react-navigation/native';
import Datepicker from '../Pickers/Datepickers/Datepicker';
import { PLANS, UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { ERROR_MESSAGES, CONSTANTS } from './settings';
import { getRelativeChange } from '../../utils/calculate';
import { KGtoLBS, LBStoKG } from '../../utils/conversions';
import { IProfile } from '../../types/data';
import { writeLosingPlan, writeMaintenancePlan } from '../../firebase/writes';

// const SUB_LOSING_WEIGHT = 5;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row', width: '90%', alignSelf: 'center', marginVertical: 2,
  },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  rowInput: { flex: 1 },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  toggle: { marginBottom: 14, width: '90%', alignSelf: 'center' },
  helperText: { width: '90%', alignSelf: 'center' },
});

const YUPschema = (currentWeight: IWeight) => yup.object().shape({
  plan: yup
    .mixed<PLANS>()
    .oneOf(Object.values(PLANS))
    .default(PLANS.MAINTENANCE),
  goalWeightOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('plan', {
      is: (p: PLANS) => p === PLANS.MAINTENANCE,
      then: (s) => s
        .test({
          name: 'within-range',
          message: ERROR_MESSAGES.MAINTENANCE_GOAL_WEIGHT,
          test: (v, ctx) => Math.abs(getRelativeChange(
            currentWeight.whole + currentWeight.fraction / 10,
            ctx.parent.goalWeightTwo / 10 + v!,
          )) < 2.0,
        })
        .default(currentWeight.whole),
      otherwise: (s) => s
        .test({
          name: 'too-high',
          message: ERROR_MESSAGES.LOSING_GOAL_WEIGHT,
          test: (v, ctx) => getRelativeChange(
            currentWeight.whole + currentWeight.fraction / 10,
            ctx.parent.goalWeightTwo / 10 + v!,
          ) < 0.0,
        })
        .default(currentWeight.whole),
    }),
  goalWeightTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('plan', {
      is: (p: PLANS) => p === PLANS.MAINTENANCE,
      then: (s) => s
        .test({
          name: 'within-range',
          message: ERROR_MESSAGES.MAINTENANCE_GOAL_WEIGHT,
          test: (v, ctx) => Math.abs(getRelativeChange(
            currentWeight.whole + currentWeight.fraction / 10,
            ctx.parent.goalWeightOne + v! / 10,
          )) < 2.0,
        }),
      otherwise: (s) => s
        .test({
          name: 'too-high',
          message: ERROR_MESSAGES.LOSING_GOAL_WEIGHT,
          test: (v, ctx) => getRelativeChange(
            currentWeight.whole + currentWeight.fraction / 10,
            ctx.parent.goalWeightOne + v! / 10,
          ) < 0.0,
        }),
    })
    .default(currentWeight.fraction),
  goalDate: yup
    .date()
    .default(addDays(new Date(), CONSTANTS.PLAN.MIN_LENGTH))
    .required(ERROR_MESSAGES.REQUIRED),
}, [
  ['goalWeightOne', 'plan'],
  ['goalWeightTwo', 'plan'],
  ['goalWeightTwo', 'goalWeightOne'],
]);

export interface IPlanForm {
  initialValues?: FormData;
  profile: IProfile;
  uid: string;
}

interface IWeight {
  whole: number;
  fraction: number;
}

interface FormData {
  plan: PLANS;
  goalWeightOne: number;
  goalWeightTwo: number;
  goalDate: Date;
}

function PlanForm({ initialValues, profile, uid }: IPlanForm) {
  const navigation = useNavigation();

  const data = React.useMemo(() => {
    if (profile.units === UNITS.IMPERIAL) {
      const { lbs, lbsFraction } = KGtoLBS(profile.weight.kg, profile.weight.fraction);
      const profileWeight = { whole: lbs, fraction: lbsFraction };
      return {
        isImperialUnits: true,
        profileWeight,
        schema: YUPschema(profileWeight),
      };
    }

    const profileWeight = { whole: profile.weight.kg, fraction: profile.weight.fraction };
    return {
      isImperialUnits: false,
      profileWeight,
      schema: YUPschema(profileWeight),
    };
  }, [profile]);

  const {
    control, handleSubmit, formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(data.schema),
    defaultValues: data.schema.getDefault(),
  });

  const onSubmit = async ({
    plan, goalWeightOne, goalWeightTwo, goalDate,
  }: FormData) => {
    if (isValid) {
      const goalWeight = data.isImperialUnits
        ? LBStoKG(goalWeightOne, goalWeightTwo)
        : { kg: goalWeightTwo, kgFraction: goalWeightTwo };

      const startWeight = data.isImperialUnits
        ? LBStoKG(data.profileWeight.whole, data.profileWeight.fraction)
        : { kg: data.profileWeight.whole, kgFraction: data.profileWeight.fraction };

      try {
        if (!initialValues) {
          if (plan === PLANS.MAINTENANCE) {
            await writeMaintenancePlan(uid, goalWeight, goalDate);
          }
          if (plan === PLANS.LOSING) {
            await writeLosingPlan(uid, goalWeight, goalDate, startWeight);
          }
        }

        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'New plan was not created, something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      {initialValues ? null : (
        <Controller
          control={control}
          name="plan"
          defaultValue={PLANS.MAINTENANCE}
          render={({ field: { onChange, value } }) => (
            <Toggle
              selection={value}
              options={{
                first: { field: PLANS.MAINTENANCE, text: 'Maintaining Weight' },
                second: { field: PLANS.LOSING, text: 'Losing Weight' },
              }}
              setSelection={onChange}
              style={styles.toggle}
            />
          )}
        />
      )}

      {/* Weight Pickers */}
      <View style={styles.rowContainer}>
        <Controller
          control={control}
          name="goalWeightOne"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.rowInput, { marginRight: 6 }]}>
              <Measurepicker
                value={value}
                label={`Goal weight, ${data.isImperialUnits ? 'lbs' : 'kg'}`}
                error={!!errors.goalWeightOne}
                handleBlur={onBlur}
                handleChange={onChange}
                min={data.isImperialUnits ? CONSTANTS.WEIGHT.LBS.MIN : CONSTANTS.WEIGHT.KG.MIN}
                max={data.isImperialUnits ? CONSTANTS.WEIGHT.LBS.MAX : CONSTANTS.WEIGHT.KG.MAX}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="goalWeightTwo"
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={[styles.rowInput, { marginLeft: 6 }]}>
              <Measurepicker
                value={value}
                label="Goal weight, decimal"
                error={!!errors.goalWeightTwo}
                handleBlur={onBlur}
                handleChange={onChange}
                min={CONSTANTS.WEIGHT.FRACTION.MIN}
                max={CONSTANTS.WEIGHT.FRACTION.MAX}
              />
            </View>
          )}
        />
      </View>
      <HelperText type="error" style={styles.helperText}>
        {errors.goalWeightTwo?.message || errors.goalWeightOne?.message}
      </HelperText>

      <Controller
        control={control}
        name="goalDate"
        render={({ field: { onChange, value } }) => (
          <>
            <Datepicker
              id="profile-form-datepicker"
              label="Goal Date"
              style={styles.input}
              value={value}
              onChange={onChange}
              error={!!errors.goalDate}
              dateFormat="yyyy-MM-dd"
              maxDate={addDays(new Date(), CONSTANTS.PLAN.MAX_LENGTH)}
              minDate={addDays(new Date(), CONSTANTS.PLAN.MIN_LENGTH)}
            />
            <HelperText
              type="error"
              style={styles.helperText}
            >
              {errors.goalDate?.message}
            </HelperText>
          </>
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={!(isValid && isDirty)}
      >
        Submit
      </Button>
    </View>
  );
}

export default PlanForm;
