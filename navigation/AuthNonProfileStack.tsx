import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

import { auth } from '../firebase/firebase';

import ReadTermsScreen from '../screens/auth/ReadTermsScreen';
import NonProfileDataScreen from '../screens/auth/NonProfileDataScreen';

import GoBack from '../components/IconButtons/GoBack';

import { AuthNonProfileStackList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthNonProfileStackList>();

function AuthNonProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NoProfileData"
        component={NonProfileDataScreen}
        options={{
          title: 'Create Profile',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <GoBack onPress={() => auth
              .signOut()
              .catch((e) => Alert.alert('Error', e))}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ReadTerms"
        component={ReadTermsScreen}
        options={({ navigation }) => ({
          title: 'Terms & Conditions',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <GoBack onPress={() => navigation.goBack()} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNonProfileStack;
