import React from 'react';
import {
  StyleSheet, View, Alert, Platform,
} from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { updateUserLastHistoryItem, updateUserWeight } from '../../firebase/updates';
import { writeUserLastHistoryItem } from '../../firebase/writes';
import { MANUAL_WEIGHIN } from '../../types/enums';
import parseStringNumbers from '../../utils/parseStringNumbers';
import Weightpickers from '../Pickers/Weightpickers';

interface FormData {
  weighIn: number;
}

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
}

function ManualWeighInForm({
  screenType, initialValue, uid, planId, historyId,
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
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            {Platform.OS === 'web'
              ? (
                <TextInput
                  value={value.toString()}
                  label="Weigh-In" // todo: units
                  style={styles.input}
                  onBlur={onBlur}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  onChangeText={(v) => onChange(v)}
                  error={errors.weighIn && true}
                  selectTextOnFocus
                />
              ) : (
                <Weightpickers
                  handleChange={onChange}
                  value={value}
                  style={styles.input}
                  label="Weigh-In"
                  error={!!errors.weighIn}
                />
              )}
            <HelperText type="error">{errors.weighIn?.message}</HelperText>
          </>
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={!isDirty}
      >
        Submit
      </Button>
    </View>
  );
}

export default ManualWeighInForm;
