import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

import { auth } from '../firebase/firebase';

import ReadTermsScreen from '../screens/withAuth/ReadTermsScreen';
import NoProfileDataScreen from '../screens/withAuth/NoProfileDataScreen';

import GoBack from '../components/IconButtons/GoBack';

type NoProfileStackList = {
  NoProfileData: undefined;
  ReadTerms: undefined;
};

const Stack = createNativeStackNavigator<NoProfileStackList>();

function AuthStack() {
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

export default AuthStack;
