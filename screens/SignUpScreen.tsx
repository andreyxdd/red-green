import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import {
  createUserWithEmailAndPassword, signInWithCredential, updateEmail,
} from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { auth } from '../firebase';
import useAppleAuthentication from '../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../hooks/useGoogleAuthentification';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  appleButton: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    height: 48,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setPasswordRepeat] = React.useState('');

  const navigation = useNavigation();

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate('Root');
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Root');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const [appleAuthAvailable, authWithApple] = useAppleAuthentication();
  const handleAppleLogin = async () => {
    try {
      const [credential, data] = await authWithApple();
      const { user } = await signInWithCredential(auth, credential);
      if (data?.email && !user.email) {
        await updateEmail(user, data.email);
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const [googleAuthLoading, authWithGoogle] = useGoogleAuthentication();
  const handleGoogleLogin = async () => {
    try {
      const [credential] = await authWithGoogle();
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPasswordRepeat(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Sign Up</Text>
        </TouchableOpacity>
        {appleAuthAvailable && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthenticationButtonStyle.WHITE_OUTLINE}
          cornerRadius={8}
          style={styles.appleButton}
          onPress={handleAppleLogin}
        />
        )}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.button}
          disabled={!googleAuthLoading}
        >
          <Text style={styles.buttonText}>Google Sign-Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
