import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';

import UserMenuScreen from '../screens/auth/WeighinTab/UserMenuScreen/UserMenuScreen';
import ManualWeighInScreen from '../screens/auth/WeighinTab/ManualWeighInScreen';
import EditProfileScreen from '../screens/auth/WeighinTab/UserMenuScreen/EditProfileScreen';
import EditPlanScreen from '../screens/auth/PlanTab/EditPlanScreen';
import CreatePlanScreen from '../screens/auth/CreatePlanScreen';

import BottomTabStack from './AuthBottomTabStack';
import GoBack from '../components/IconButtons/GoBack';
import Close from '../components/IconButtons/Close';

import { AuthStackList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthStackList>();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserMenu"
        component={UserMenuScreen}
        options={({ navigation }) => ({
          title: 'Account',
          headerTitleAlign: 'center',
          headerTransparent: true,
          animation: 'slide_from_bottom',
          headerLeft: () => <View style={{ marginLeft: 50 }} />,
          headerRight: () => (
            <Close onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="CreatePlan"
        component={CreatePlanScreen}
        options={({ navigation }) => ({
          title: 'Create Plan',
          headerTitleAlign: 'center',
          headerTransparent: true,
          animation: 'slide_from_bottom',
          headerLeft: () => <View style={{ marginLeft: 50 }} />,
          headerRight: () => (
            <Close onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="ManualWeighIn"
        component={ManualWeighInScreen}
        options={({ navigation }) => ({
          title: 'Manual Weigh-In',
          headerTitleAlign: 'center',
          headerTransparent: true,
          animation: 'slide_from_bottom',
          headerLeft: () => <View style={{ marginLeft: 50 }} />,
          headerRight: () => (
            <Close onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={({ navigation }) => ({
          title: 'Edit Profile',
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerLeft: () => (
            <GoBack onPress={() => navigation.goBack()} />
          ),
        })}
      />
      <Stack.Screen
        name="EditPlan"
        component={EditPlanScreen}
        options={({ navigation }) => ({
          title: 'Edit Plan',
          headerTitleAlign: 'center',
          headerTransparent: true,
          headerLeft: () => (
            <GoBack onPress={() => navigation.navigate('TabThree')} />
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
