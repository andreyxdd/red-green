import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

import { auth } from '../firebase/firebase';

import ReadTermsScreen from '../screens/auth/ReadTermsScreen';
import NoProfileDataScreen from '../screens/auth/NoProfileDataScreen';

import GoBack from '../components/IconButtons/GoBack';

import { AuthNonProfileStackList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthNonProfileStackList>();

function AuthNonProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NoProfileData"
        component={NoProfileDataScreen}
        options={{
          title: 'Profile Data',
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
        options={{ headerShown: false }}
        name="ReadTerms"
        component={ReadTermsScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthNonProfileStack;
