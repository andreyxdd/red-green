import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { updateUserLastHistoryItem, updateUserWeight } from '../../firebase/updates';
import { writeUserLastHistoryItem } from '../../firebase/writes';
import { MANUAL_WEIGHIN } from '../../types/enums';

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
    const newValue = weighIn as unknown as string;

    if (isValid) {
      try {
        const value = parseFloat(
          newValue.indexOf(',') > 0
            ? newValue.replaceAll(',', '.')
            : newValue,
        );

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
        Alert.alert('Error', 'Incorrect weigh-in value provided');
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
            <TextInput
              value={value.toString()}
              label="Weigh-In" // todo: units
              style={styles.input}
              onBlur={onBlur}
              keyboardType="numeric"
              returnKeyType="done"
              onChangeText={(v) => onChange(v)}
              error={errors.weighIn && true}
              selectTextOnFocus
            />
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
        Submit Weigh-In
      </Button>
    </View>
  );
}

export default ManualWeighInForm;
