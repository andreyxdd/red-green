import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithCredential, updateEmail } from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase/firebase';
import useAppleAuthentication from '../../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../../hooks/useGoogleAuthentification';
import Divider from '../../components/Divider';
import Container from '../../components/Container';
import SignInForm from '../../components/noAuth/SignInForm';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
});

function SignInScreen() {
  const navigation = useNavigation();
  const uidAndProfileData = useDataStore(
    (state: IDataStore) => state.profileData && state.uid,
  );

  // TODO: correct navigation
  React.useEffect(() => {
    if (uidAndProfileData) {
      navigation.navigate('Root');
    }
  }, [uidAndProfileData, navigation]);

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
        {appleAuthAvailable && (
          <AppleAuthenticationButton
            buttonType={AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={4}
            style={[styles.button, { height: 45 }]}
            onPress={handleAppleLogin}
          />
        )}
        <Button
          mode="contained"
          onPress={handleGoogleLogin}
          disabled={!googleAuthLoading}
          style={styles.button}
        >
          Continue with Google
        </Button>
      </View>
      <Divider containerStyle={{ marginVertical: 4 }}>OR</Divider>
      <SignInForm />
      <Divider containerStyle={{ marginVertical: 4 }} />
      <Container style={{ marginVertical: 12 }}>
        <Button
          mode="outlined"
          onPress={() => { navigation.navigate('SignUp'); }}
          style={styles.button}
        >
          Don&apos;t have an account? Sign Up
        </Button>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default SignInScreen;
