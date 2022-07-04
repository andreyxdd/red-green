import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from '@react-navigation/native';

import shallow from 'zustand/shallow';
import { addDays } from 'date-fns';
import Datepicker from '../Pickers/Datepickers/Datepicker';
import { PLANS, UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import { REGEX, ERROR_MESSAGES, CONSTANTS } from './index';
import { getRelativeChange } from '../../utils/calculate';

const SUB_LOSING_WEIGHT = 5;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  input: {
    marginVertical: 2, width: '90%', alignSelf: 'center',
  },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  toggle: { marginBottom: 14, width: '90%', alignSelf: 'center' },
  row: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  helperText: { width: '90%', alignSelf: 'center' },
});

export interface FormData{
  planType: PLANS;
  goalWeight: number;
  goalDate: Date;
  // startWeight?: number;
}

export interface IPlanForm {
  initialValues?: FormData;
  uid: string;
}

function PlanForm({ initialValues, uid }: IPlanForm) {
  const [isImperialUnits, profileWeight] = useDataStore(
    (state: IDataStore) => [
      state.profileData?.units === UNITS.IMPERIAL,
      state.profileData ? state.profileData.weight : CONSTANTS.WEIGHT.KG.AVG],
    shallow,
  );

  // const navigation = useNavigation();

  const {
    control, handleSubmit, formState: { errors, isValid, isDirty }, watch, setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: initialValues && initialValues,
  });

  const isLosingPlanWatcher = watch('planType') === PLANS.LOSING;

  const onSubmit = ({ planType, goalWeight, goalDate }: FormData) => {
    if (isValid) {
      try {
        console.log(uid);
        console.log({ planType, goalWeight, goalDate });
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  React.useEffect(() => {
    setValue('goalWeight', isLosingPlanWatcher ? profileWeight - SUB_LOSING_WEIGHT : profileWeight);
  }, [isLosingPlanWatcher, profileWeight, setValue]);

  return (
    <View style={styles.container}>
      {initialValues ? null : (
        <Controller
          control={control}
          name="planType"
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
      <Controller
        control={control}
        defaultValue={initialValues ? initialValues.goalWeight : profileWeight}
        name="goalWeight"
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            message: isImperialUnits
              ? ERROR_MESSAGES.INVALID_WEIGHT.LBS
              : ERROR_MESSAGES.INVALID_WEIGHT.KG,
            value: isImperialUnits
              ? REGEX.WEIGHT.LBS
              : REGEX.WEIGHT.KG,
          },
          validate: (v) => {
            const relativeChange = getRelativeChange(profileWeight, v);
            if (!isLosingPlanWatcher) { // MAINTENANCE
              return Math.abs(relativeChange) < 2.0 || ERROR_MESSAGES.MAINTENANCE_GOAL_WEIGHT;
            }
            return relativeChange < 0.0 || ERROR_MESSAGES.LOSING_GOAL_WEIGHT;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Measurepicker
              value={value}
              label={`Goal weight, ${isImperialUnits ? 'lbs' : 'kg'}`}
              style={styles.input}
              error={!!errors.goalWeight}
              handleBlur={onBlur}
              handleChange={onChange}
              numOfWholePartOptions={isImperialUnits
                ? CONSTANTS.WEIGHT.LBS.MAX - CONSTANTS.WEIGHT.LBS.MIN
                : CONSTANTS.WEIGHT.KG.MAX - CONSTANTS.WEIGHT.KG.MIN}
              wholeMinValue={isImperialUnits
                ? CONSTANTS.WEIGHT.LBS.MIN
                : CONSTANTS.WEIGHT.KG.MIN}
              numOfDecimalOptions={isImperialUnits
                ? undefined
                : CONSTANTS.WEIGHT.KG.DECIMAL}
            />
            <HelperText
              type="error"
              style={styles.helperText}
            >
              {errors.goalWeight?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        defaultValue={addDays(new Date(), CONSTANTS.MIN_PLAN_LENGTH)}
        name="goalDate"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <Datepicker
              id="profile-form-datepicker"
              label="Gaol Date"
              style={styles.input}
              value={value}
              onChange={onChange}
              error={!!errors.goalDate}
              dateFormat="yyyy-MM-dd"
              maxDate={addDays(new Date(), CONSTANTS.MAX_PLAN_LENGTH)}
              minDate={addDays(new Date(), CONSTANTS.MIN_PLAN_LENGTH)}
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
      {/* isLosingPlanWatcher && !initialValues
        ? (
          <Controller
            control={control}
            name="startWeight"
            defaultValue={profileWeight && profileWeight}
            rules={{
              required: { message: ERROR_MESSAGES.REQUIRED, value: true },
              pattern: {
                message: ERROR_MESSAGES.INVALID_VALUE,
                value: REGEX.measureValue,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Measurepicker
                  value={value || 0.0}
                  label={`Start weight, ${isImperialUnits ? 'lbs' : 'kg'}`}
                  style={styles.input}
                  error={!!errors.startWeight}
                  handleBlur={onBlur}
                  handleChange={onChange}
                  numOfWholePartOptions={isImperialUnits ? 320 : 100}
                  wholeMinValue={isImperialUnits ? 85 : 40}
                  numOfDecimalOptions={isImperialUnits ? undefined : 10}
                />
                <HelperText type="error">{errors.startWeight?.message}</HelperText>
              </>
            )}
          />
        )
            : null */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={!isValid || !isDirty}
      >
        Submit
      </Button>
    </View>
  );
}

export default PlanForm;