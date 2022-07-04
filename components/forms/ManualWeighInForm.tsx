import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { updateUserLastHistoryItem, updateUserWeight } from '../../firebase/updates';
import { writeUserLastHistoryItem } from '../../firebase/writes';
import { MANUAL_WEIGHIN } from '../../types/enums';
import parseStringNumbers from '../../utils/parseStringNumbers';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { REGEX, ERROR_MESSAGES, CONSTANTS } from './index';
import { LBStoKG } from '../../utils/calculate';

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
  screenType: MANUAL_WEIGHIN;
  initialValue?: number;
  uid: string;
  planId: string;
  historyId: string;
  isImperialUnits: boolean;
}

function ManualWeighInForm({
  screenType, initialValue, uid, planId, historyId, isImperialUnits,
}: IManualWeighInForm) {
  // screen nav object
  const navigation = useNavigation();

  // handle form
  const {
    control, handleSubmit, formState: { errors, isValid, isDirty },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // submit form
  const onSubmit = async ({ weighIn }: FormData) => {
    if (isValid) {
      try {
        const weighInParsed = parseStringNumbers(weighIn);
        const newWeight = isImperialUnits ? LBStoKG(weighInParsed) : weighInParsed;

        if (Number.isFinite(newWeight)) {
          updateUserWeight(uid, newWeight);

          if (screenType === MANUAL_WEIGHIN.EDIT) {
            updateUserLastHistoryItem(uid, planId, historyId, newWeight);
          } else {
            writeUserLastHistoryItem(uid, planId, newWeight);
          }

          navigation.goBack();
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="weighIn"
        defaultValue={initialValue || 0.0}
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
            if (isImperialUnits) {
              return (v > CONSTANTS.WEIGHT.LBS.MIN && v < CONSTANTS.WEIGHT.LBS.MAX)
                || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS;
            }
            return (v > CONSTANTS.WEIGHT.KG.MIN && v < CONSTANTS.WEIGHT.KG.MAX)
              || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG;
          },
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <Measurepicker
              value={value}
              label={`Weigh-In, ${isImperialUnits ? 'lbs' : 'kg'}`}
              style={styles.input}
              error={!!errors.weighIn}
              handleBlur={onBlur}
              handleChange={onChange}
              numOfWholePartOptions={isImperialUnits
                ? CONSTANTS.WEIGHT.LBS.MAX - CONSTANTS.WEIGHT.LBS.MIN
                : CONSTANTS.WEIGHT.KG.MAX - CONSTANTS.WEIGHT.KG.MIN}
              wholeMinValue={isImperialUnits ? CONSTANTS.WEIGHT.LBS.MIN
                : CONSTANTS.WEIGHT.KG.MIN}
              numOfDecimalOptions={isImperialUnits ? undefined
                : CONSTANTS.WEIGHT.KG.DECIMAL}
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
