import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { ERROR_MESSAGES, REGEX } from './index';

interface FormData {
  email: string;
  password: string;
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center', width: '100%' },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  helperText: { width: '90%', alignSelf: 'center' },
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
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. The provided email or password might be incorrect');
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
          pattern: { value: REGEX.EMAIL, message: ERROR_MESSAGES.EMAIL },
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
        name="password"
        defaultValue=""
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
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
                if (email && !errors.email) {
                  await onSubmit({ email, password: value });
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
        Sign In
      </Button>
    </View>
  );
}

export default SignInForm;
