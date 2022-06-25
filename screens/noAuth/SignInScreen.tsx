import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { signInWithEmailAndPassword, signInWithCredential, updateEmail } from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { Button, TextInput } from 'react-native-paper';
import { auth } from '../../firebase';
import useAuthentification from '../../hooks/useAuthentification';
import useAppleAuthentication from '../../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../../hooks/useGoogleAuthentification';
import Divider from '../../components/Divider';
import Container from '../../components/Container';

const styles = StyleSheet.create({
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
});

function IntroScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const navigation = useNavigation();
  const { user } = useAuthentification();

  React.useEffect(() => {
    if (user) {
      navigation.navigate('Root');
    }
  }, [user, navigation]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const [appleAuthAvailable, authWithApple] = useAppleAuthentication();
  const handleAppleLogin = async () => {
    try {
      const [credential, data] = await authWithApple();
      const { user: appleUser } = await signInWithCredential(auth, credential);
      if (data?.email && !appleUser.email) {
        await updateEmail(appleUser, data.email);
      }
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication();
  const handleGoogleLogin = async () => {
    try {
      const [credential] = await authWithGoogle();
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Container style={{ marginVertical: 12 }}>
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
      </Container>
      <Divider>OR</Divider>
      <TextInput
        label="Email"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={{ marginVertical: 6 }}
        autoCapitalize="none"
      />
      <TextInput
        label="Password"
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={{ marginVertical: 6 }}
      />
      <Container style={{ marginVertical: 12 }}>
        <Button
          mode="contained"
          onPress={handleLogin}
          style={styles.button}
        >
          Sign In
        </Button>
      </Container>
      <Divider />
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

export default IntroScreen;
