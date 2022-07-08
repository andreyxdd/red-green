import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { writeUserHistoryItem, writeUserWeight } from '../../firebase/writes';
import parseStringNumbers from '../../utils/parseStringNumbers';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { ERROR_MESSAGES, CONSTANTS } from './settings';
import { KGtoLBS, LBStoKG } from '../../utils/calculate';

interface FormData {
  weighIn: number;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  helperText: { width: '90%', alignSelf: 'center' },
});

export type IManualWeighInForm = {
  initialValue?: number;
  uid: string;
  planId: string;
  historyId: string;
  isImperialUnits: boolean;
}

function ManualWeighInForm({
  initialValue, uid, planId, historyId, isImperialUnits,
}: IManualWeighInForm) {
  // screen nav object
  const navigation = useNavigation();

  // handle form
  const {
    control, handleSubmit, formState: {
      errors, isValid, isDirty,
    }, setValue, watch,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const weighInWatcher = watch('weighIn');
  React.useEffect(() => {
    if (weighInWatcher) {
      if (isImperialUnits) {
        setValue('weighIn', KGtoLBS(weighInWatcher));
      } else if (initialValue) {
        setValue('weighIn', initialValue);
      } else {
        setValue('weighIn', LBStoKG(weighInWatcher));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImperialUnits]);

  // submit form
  const onSubmit = async ({ weighIn }: FormData) => {
    if (isValid) {
      try {
        const weighInParsed = parseStringNumbers(weighIn);
        const newWeight = isImperialUnits ? LBStoKG(weighInParsed) : weighInParsed;

        if (Number.isFinite(newWeight)) {
          writeUserWeight(uid, newWeight);

          writeUserHistoryItem(uid, planId, historyId, newWeight);

          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  const weighInFieldRules = React.useMemo(() => ({
    required: { message: ERROR_MESSAGES.REQUIRED, value: true },
    /* pattern: {
      message: isImperialUnits
        ? ERROR_MESSAGES.INVALID_WEIGHT.LBS
        : ERROR_MESSAGES.INVALID_WEIGHT.KG,
      value: isImperialUnits
        ? REGEX.WEIGHT.LBS
        : REGEX.WEIGHT.KG,
    }, */
    validate: (v: any) => {
      if (isImperialUnits) {
        return (Number(v) > CONSTANTS.WEIGHT.LBS.MIN && Number(v) < CONSTANTS.WEIGHT.LBS.MAX)
                || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS;
      }
      return (Number(v) > CONSTANTS.WEIGHT.KG.MIN && Number(v) < CONSTANTS.WEIGHT.KG.MAX)
              || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG;
    },

  }), [isImperialUnits]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="weighIn"
        defaultValue={initialValue || 0.0}
        rules={weighInFieldRules}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <Measurepicker
              value={value}
              label={`Weigh-In, ${isImperialUnits ? 'lbs' : 'kg'}`}
              style={styles.input}
              error={!!errors.weighIn}
              handleBlur={onBlur}
              handleChange={onChange}
              min={1}
              max={102}
            />
            <HelperText
              style={styles.helperText}
              type="error"
            >
              {errors.weighIn?.message}
            </HelperText>
          </>
        )}
      />
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

export default ManualWeighInForm;
