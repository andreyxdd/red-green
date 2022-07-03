/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithCredential, updateEmail } from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { Button } from 'react-native-paper';
import { verticalScale } from 'react-native-size-matters';

import { FontAwesome } from '@expo/vector-icons';
import { auth } from '../../firebase/firebase';
import useAppleAuthentication from '../../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../../hooks/useGoogleAuthentification';
import Divider from '../../components/Divider';
import SignInForm from '../../components/Forms/SignInForm';
import { NonAuthStackScreenProps } from '../../types/navigation';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: { justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.0)' },
  button: {
    width: '80%',
    paddingVertical: 4,
    marginVertical: 4,
    alignItems: 'center',
  },
});

function SignInScreen({ navigation: { navigate } }: NonAuthStackScreenProps<'SignIn'>) {
  const [appleAuthAvailable, authWithApple] = useAppleAuthentication();
  const handleAppleLogin = async () => {
    try {
      const [credential, data] = await authWithApple();
      const { user: appleUser } = await signInWithCredential(auth, credential);
      if (data?.email && !appleUser.email) {
        await updateEmail(appleUser, data.email);
      }
    } catch (error: any) {
      Alert.alert('Error', `Something went wrong:\n${error}`);
    }
  };

  const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication();
  const handleGoogleLogin = async () => {
    try {
      const [credential] = await authWithGoogle();
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      Alert.alert('Error', `Something went wrong:\n${error}`);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={[styles.container, { flex: 1 }]}>
      <View style={[styles.container, { alignItems: 'center' }]}>
        {appleAuthAvailable ? (
          <AppleAuthenticationButton
            buttonType={AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={4}
            style={[styles.button, { height: 45 }]}
            onPress={handleAppleLogin}
          />
        ) : null}
        <Button
          mode="contained"
          onPress={handleGoogleLogin}
          disabled={!googleAuthLoading}
          style={[styles.button, { backgroundColor: colors.google }]}
        >
          <FontAwesome name="google" size={verticalScale(12)} color="white" />
          {' '}
          Continue with Google
        </Button>
      </View>
      <Divider containerStyle={{ marginVertical: 4 }}>OR</Divider>
      <SignInForm />
      <Divider containerStyle={{ marginVertical: 4 }} />
      <View style={[styles.container, { alignItems: 'center', marginVertical: 12 }]}>
        <Button
          mode="outlined"
          onPress={() => { navigate('SignUp'); }}
          style={styles.button}
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default SignInScreen;
