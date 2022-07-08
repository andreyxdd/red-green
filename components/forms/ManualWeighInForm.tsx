import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { writeUserHistoryItem, writeUserWeight } from '../../firebase/writes';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { ERROR_MESSAGES, CONSTANTS } from './settings';
import { KGtoLBS, LBStoKG } from '../../utils/conversions';
import { IWeight, IGeneralWeight } from '../../types/data';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
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
  helperText: { width: '90%', alignSelf: 'center' },
});

const YUPschema = (defaultWeighIn: IGeneralWeight, isImperialUnits: boolean) => yup.object().shape({
  weighInOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .min(
      isImperialUnits
        ? CONSTANTS.WEIGHT.LBS.MIN : CONSTANTS.WEIGHT.KG.MIN,
      isImperialUnits
        ? ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS : ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG,
    )
    .max(
      isImperialUnits
        ? CONSTANTS.WEIGHT.LBS.MAX : CONSTANTS.WEIGHT.KG.MAX,
      isImperialUnits
        ? ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS : ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG,
    )
    .default(defaultWeighIn.whole),
  weighInTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .min(CONSTANTS.WEIGHT.FRACTION.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .max(CONSTANTS.WEIGHT.FRACTION.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .default(defaultWeighIn.fraction),
});

interface FormData {
  weighInOne: number;
  weighInTwo: number;
}

export type IManualWeighInForm = {
  initialValues?: FormData;
  uid: string;
  planId: string;
  historyId: string;
  isImperialUnits: boolean;
  profileWeight: IWeight;
}

function ManualWeighInForm({
  initialValues, uid, planId, historyId, isImperialUnits, profileWeight,
}: IManualWeighInForm) {
  const data = React.useMemo(() => {
    if (isImperialUnits) {
      const { lbs, lbsFraction } = KGtoLBS(profileWeight.kg, profileWeight.kgFraction);
      const defaultWeighIn = { whole: lbs, fraction: lbsFraction };
      return { defaultWeighIn, isImperialUnits: true };
    }

    const defaultWeighIn = { whole: profileWeight.kg, fraction: profileWeight.kgFraction };
    return { defaultWeighIn, isImperialUnits: false };
  }, [profileWeight, isImperialUnits]);

  // screen nav object
  const navigation = useNavigation();

  // handle form
  const {
    control, handleSubmit, formState: { errors, isValid }, setValue,
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(YUPschema(data.defaultWeighIn, data.isImperialUnits)),
    defaultValues: initialValues
      || YUPschema(data.defaultWeighIn, data.isImperialUnits).getDefault(),
  });

  React.useEffect(() => {
    if (isImperialUnits) {
      const { lbs, lbsFraction } = KGtoLBS(profileWeight.kg, profileWeight.kgFraction);
      const defaultWeighIn = { whole: lbs, fraction: lbsFraction };
      setValue('weighInOne', defaultWeighIn.whole, { shouldValidate: true });
      setValue('weighInTwo', defaultWeighIn.fraction, { shouldValidate: true });
      return;
    }

    const defaultWeighIn = { whole: profileWeight.kg, fraction: profileWeight.kgFraction };
    setValue('weighInOne', defaultWeighIn.whole, { shouldValidate: true });
    setValue('weighInTwo', defaultWeighIn.fraction, { shouldValidate: true });
  }, [profileWeight, isImperialUnits, setValue]);

  // submit form
  const onSubmit = async ({ weighInOne, weighInTwo }: FormData) => {
    if (isValid) {
      try {
        const newWeighInKG = isImperialUnits
          ? LBStoKG(weighInOne, weighInTwo)
          : { kg: weighInOne, kgFraction: weighInTwo };

        writeUserWeight(uid, newWeighInKG);

        await writeUserHistoryItem(uid, planId, historyId, newWeighInKG);

        navigation.goBack();
      } catch (error) {
        Alert.alert('Error', 'Weighin was not submitted, something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Controller
          control={control}
          name="weighInOne"
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={[styles.rowInput, { marginRight: 6 }]}>
              <Measurepicker
                value={value}
                label={`Weigh-In, ${isImperialUnits ? 'lbs' : 'kg'}`}
                error={!!errors.weighInOne}
                handleBlur={onBlur}
                handleChange={onChange}
                min={isImperialUnits ? CONSTANTS.WEIGHT.LBS.MIN : CONSTANTS.WEIGHT.KG.MIN}
                max={isImperialUnits ? CONSTANTS.WEIGHT.LBS.MAX : CONSTANTS.WEIGHT.KG.MAX}
              />
            </View>
          )}
        />
        <Controller
          control={control}
          name="weighInTwo"
          render={({ field: { onBlur, onChange, value } }) => (
            <View style={[styles.rowInput, { marginRight: 6 }]}>
              <Measurepicker
                value={value}
                label="Weigh-In, decimal"
                error={!!errors.weighInTwo}
                handleBlur={onBlur}
                handleChange={onChange}
                min={isImperialUnits ? CONSTANTS.WEIGHT.LBS.MIN : CONSTANTS.WEIGHT.KG.MIN}
                max={isImperialUnits ? CONSTANTS.WEIGHT.LBS.MAX : CONSTANTS.WEIGHT.KG.MAX}
              />
            </View>
          )}
        />
      </View>
      <HelperText type="error" style={styles.helperText}>
        {errors.weighInOne?.message || errors.weighInTwo?.message}
      </HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={!isValid}
      >
        Submit
      </Button>
    </View>
  );
}

export default ManualWeighInForm;
