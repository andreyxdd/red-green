import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Text, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert, TextInput,
} from 'react-native';
import { signInWithEmailAndPassword, signInWithCredential, updateEmail } from 'firebase/auth';
import { AppleAuthenticationButton, AppleAuthenticationButtonType, AppleAuthenticationButtonStyle } from 'expo-apple-authentication';
import { auth } from '../../firebase';
import useAuthentification from '../../hooks/useAuthentification';
import useAppleAuthentication from '../../hooks/useAppleAuthentification';
import useGoogleAuthentication from '../../hooks/useGoogleAuthentification';
import {
  buttons, containers, typography, inputs,
} from '../../styles';

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
    <KeyboardAvoidingView
      style={containers.default}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={containers.button}>
        {appleAuthAvailable && (
        <AppleAuthenticationButton
          buttonType={AppleAuthenticationButtonType.CONTINUE}
          buttonStyle={AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={8}
          style={buttons.apple}
          onPress={handleAppleLogin}
        />
        )}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={buttons.google}
          disabled={!googleAuthLoading}
        >
          <Text style={typography.googleButton}>Continue with Google</Text>
        </TouchableOpacity>
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
        <Text style={[typography.label, { textAlign: 'left' }]}>Password:</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={inputs.text}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={buttons.contained}
        >
          <Text style={typography.buttonContained}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { navigation.navigate('SignUp'); }}
          style={buttons.outlined}
        >
          <Text style={typography.buttonOutlined}>Don&apos;t have an account?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

export default IntroScreen;
