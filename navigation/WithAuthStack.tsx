import React from 'react';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { View } from 'react-native';

import UserMenuScreen from '../screens/withAuth/Weighin/UserMenu/UserMenuScreen';
import ManualWeighInScreen from '../screens/withAuth/Weighin/ManualWeighInScreen';
import EditProfileScreen from '../screens/withAuth/Weighin/UserMenu/EditProfileScreen';
import EditPlanScreen from '../screens/withAuth/Plan/EditPlanScreen';
import CreatePlanScreen from '../screens/withAuth/CreatePlanScreen';

import BottomTabStack from './BottomTabStack';
import GoBack from '../components/IconButtons/GoBack';
import Close from '../components/IconButtons/Close';

export type AuthTabList = {
  TodayTab: undefined;
  WeighInTab: undefined;
  PlanTab: undefined;
};

type AuthStackList = {
  Root: NavigatorScreenParams<AuthTabList> | undefined;
  ManualWeighIn: { screenType: string, value?: number };
  UserMenu: undefined;
  EditProfile: undefined;
  CreatePlan: undefined;
  EditPlan: undefined;
};

export type AuthTabProps<Screen extends keyof AuthTabList> = CompositeScreenProps<
  BottomTabScreenProps<AuthTabList, Screen>,
  NativeStackScreenProps<AuthStackList>
>;

const Stack = createNativeStackNavigator<AuthStackList>();

function WithAuthStack() {
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
          title: 'Profile',
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

export default WithAuthStack;
