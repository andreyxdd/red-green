import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Alert, Platform, KeyboardAvoidingView, Text, TextInput, Pressable, View,
} from 'react-native';
import {
  createUserWithEmailAndPassword, signInWithCredential, updateEmail,
} from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { auth } from '../../firebase';
import useAuthentification from '../../hooks/useAuthentification';
import useAppleAuthentication from '../../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../../hooks/useGoogleAuthentification';
import {
  buttons, containers, typography, inputs,
} from '../../styles';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [, setEmailConfirm] = React.useState('');

  const navigation = useNavigation();

  const { user } = useAuthentification();
  React.useEffect(() => {
    if (user) {
      navigation.navigate('Root');
    }
  }, [user, navigation]);

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Intro');
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
    <KeyboardAvoidingView
      style={[containers.default, containers.main]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[containers.default, containers.button]}>
        {appleAuthAvailable ? (
          <AppleAuthenticationButton
            buttonType={AppleAuthenticationButtonType.SIGN_UP}
            buttonStyle={AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={8}
            style={[buttons.default, buttons.apple]}
            onPress={handleAppleLogin}
          />
        ) : null}
        <Pressable
          onPress={handleGoogleLogin}
          style={[buttons.default, buttons.google]}
          disabled={!googleAuthLoading}
        >
          <Text style={typography.googleButton}>Sign Up with Google</Text>
        </Pressable>
      </View>
      <Text style={typography.secondaryHeading}>OR</Text>
      <View style={containers.input}>
        <Text style={[typography.label, { textAlign: 'left' }]}>Email:</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={inputs.text}
        />
        <Text style={[typography.label, { textAlign: 'left' }]}>Confirm email:</Text>
        <TextInput
          placeholder="Confirm email"
          value={password}
          onChangeText={(text) => setEmailConfirm(text)}
          style={inputs.text}
          secureTextEntry
        />
        <Text style={[typography.label, { textAlign: 'left' }]}>Password:</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={inputs.text}
          secureTextEntry
        />
        <Pressable
          onPress={handleSignUp}
          style={[buttons.default, buttons.contained]}
        >
          <Text style={typography.containedButton}>Sign Up</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;
