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

interface FormData {
  weighIn: number;
}

const REGEX = {
  measureValue: /^\d*\.?\d{1}$/,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  INVALID_VALUE: 'Not a Valid Value',
};

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
        const value = parseStringNumbers(weighIn);

        if (Number.isFinite(value)) {
          updateUserWeight(uid, value);

          if (screenType === MANUAL_WEIGHIN.EDIT) {
            updateUserLastHistoryItem(uid, planId, historyId, value);
          } else {
            writeUserLastHistoryItem(uid, planId, value);
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
            message: ERROR_MESSAGES.INVALID_VALUE,
            value: REGEX.measureValue,
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
              numOfWholePartOptions={isImperialUnits ? 320 : 100}
              wholeMinValue={isImperialUnits ? 85 : 40}
              numOfDecimalOptions={isImperialUnits ? undefined : 10}
            />
            <HelperText type="error">{errors.weighIn?.message}</HelperText>
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
