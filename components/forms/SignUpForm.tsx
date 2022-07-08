import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { ERROR_MESSAGES, CONSTANTS } from './index';

const styles = StyleSheet.create({
  container: { justifyContent: 'center', width: '100%' },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  helperText: { width: '90%', alignSelf: 'center' },
});

const schema = yup.object().shape({
  email: yup.string().email(ERROR_MESSAGES.EMAIL).required(ERROR_MESSAGES.REQUIRED),
  emailRepeat: yup.string().oneOf([yup.ref('email'), null], 'emails must match').required(ERROR_MESSAGES.REQUIRED),
  password: yup.string()
    .min(CONSTANTS.PASSWORD.MIN_LENGTH, ERROR_MESSAGES.PASSWORD_LENGTH)
    .max(CONSTANTS.PASSWORD.MAX_LENGTH, ERROR_MESSAGES.PASSWORD_LENGTH)
    .required(ERROR_MESSAGES.REQUIRED), // TODO: add more validation
});

interface FormData {
  email: string;
  emailRepeat: string;
  password: string;
}

function SignInForm() {
  // show/hide password charachters
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  // handle form
  const {
    control, handleSubmit, formState: { errors, isValid }, getValues,
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  // submit form
  const onSubmit = async (data: FormData) => {
    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <TextInput
              value={value}
              label="Email"
              placeholder="example@sample.eg"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(v) => onChange(v)}
              error={errors.email && true}
            />
            <HelperText
              type="error"
              style={styles.helperText}
            >
              {errors.email?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="emailRepeat"
        defaultValue=""
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <TextInput
              value={value}
              label="Confirm Email"
              placeholder="example@sample.eg"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(v) => onChange(v)}
              error={errors.email && true}
            />
            <HelperText
              type="error"
              style={styles.helperText}
            >
              {errors.emailRepeat?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <TextInput
              value={value}
              label="Password"
              style={styles.input}
              secureTextEntry={secureTextEntry}
              textContentType="password"
              onBlur={onBlur}
              onSubmitEditing={async () => {
                const email = getValues('email');
                const emailRepeat = getValues('emailRepeat');
                if (
                  email && emailRepeat
                  && !errors.email && !errors.emailRepeat
                  && !errors.password
                ) {
                  await onSubmit({ email, emailRepeat, password: value });
                }
              }}
              onChangeText={(v) => onChange(v)}
              error={errors.password && true}
              right={(
                <TextInput.Icon
                  name={secureTextEntry ? 'eye' : 'eye-off'}
                  style={{ zIndex: 10, paddingLeft: 12 }}
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                />
              )}
            />
            <HelperText
              type="error"
              style={styles.helperText}
            >
              {errors.password?.message}
            </HelperText>
          </>
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
      >
        Sign Up
      </Button>
    </View>
  );
}

export default SignInForm;
