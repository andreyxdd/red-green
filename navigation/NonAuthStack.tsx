import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IntroScreen from '../screens/nonAuth/IntroScreen';
import SignInScreen from '../screens/nonAuth/SignInScreen';
import SignUpScreen from '../screens/nonAuth/SignUpScreen';

import GoBack from '../components/IconButtons/GoBack';

import { NonAuthStackList } from '../types/navigation';

const Stack = createNativeStackNavigator<NonAuthStackList>();

function NonAuthStack() {
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

export default NonAuthStack;
