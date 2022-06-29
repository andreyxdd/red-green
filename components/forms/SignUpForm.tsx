import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

interface FormData {
  email: string;
  emailRepeat: string;
  password: string;
}

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  INVALID_EMAIL: 'Not a Valid Email',
  UNEQUAL_EMAILS: "Emails aren't the same",
};

const PASSWORD_MIN_LENGTH = 6;

const REGEX = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', width: '100%' },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
});

function SignInForm() {
  // show/hide password charachters
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  // handle form
  const {
    control, handleSubmit, formState: { errors, isValid }, getValues,
  } = useForm<FormData>({
    mode: 'onChange',
  });

  // submit form
  const onSubmit = async (data: FormData) => {
    if (isValid) {
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        Alert.alert('Error', 'Incorrect email or password');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="email"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            value: REGEX.email,
            message: ERROR_MESSAGES.INVALID_EMAIL,
          },
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <TextInput
              value={value}
              label="Email"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(v) => onChange(v)}
              error={errors.email && true}
            />
            <HelperText type="error">{errors.email?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="emailRepeat"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            value: REGEX.email,
            message: ERROR_MESSAGES.INVALID_EMAIL,
          },
          validate: (value) => value === getValues('email') || ERROR_MESSAGES.UNEQUAL_EMAILS,
        }}
        render={({ field: { onBlur, onChange, value } }) => (
          <>
            <TextInput
              value={value}
              label="Confirm Email"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(v) => onChange(v)}
              error={errors.email && true}
            />
            <HelperText type="error">{errors.emailRepeat?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="password"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          minLength: {
            value: PASSWORD_MIN_LENGTH,
            message: 'Password must have at least 6 characters',
          },
        }}
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
                  onPress={() => {
                    setSecureTextEntry(!secureTextEntry);
                    return false;
                  }}
                />
              )}
            />
            <HelperText type="error">{errors.password?.message}</HelperText>
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