import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/noAuth/IntroScreen';
import SignInScreen from '../screens/noAuth/SignInScreen';
import SignUpScreen from '../screens/noAuth/SignUpScreen';

import GoBack from '../components/IconButtons/GoBack';

type NoAuthStackList = {
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const Stack = createNativeStackNavigator<NoAuthStackList>();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Intro"
        component={IntroScreen}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={({ navigation }) => ({
          title: 'Sign In',
          headerTitleAlign: 'center',
          headerLeft: () => (<GoBack onPress={() => navigation.goBack()} />),
        })}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={({ navigation }) => ({
          title: 'Sign Up',
          headerTitleAlign: 'center',
          headerLeft: () => (<GoBack onPress={() => navigation.goBack()} />),
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
