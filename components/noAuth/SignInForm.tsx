import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';

interface FormData {
  email: string;
  password: string;
}

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  INVALID_EMAIL: 'Not a Valid Email',
};

const REGEX = {
  email: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', width: '100%' },
  input: { marginVertical: 4, width: '90%', alignSelf: 'center' },
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
        await signInWithEmailAndPassword(auth, data.email, data.password);
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
                  name="eye"
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
        Sign In
      </Button>
    </View>
  );
}

export default SignInForm;
