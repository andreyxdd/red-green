import React from 'react';
import {
  NavigationContainer, DefaultTheme, DarkTheme, useNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert, ColorSchemeName, View } from 'react-native';
import shallow from 'zustand/shallow';

import IntroScreen from '../screens/noAuth/IntroScreen';
import SignInScreen from '../screens/noAuth/SignInScreen';
import SignUpScreen from '../screens/noAuth/SignUpScreen';
import NoProfileDataScreen from '../screens/withAuth/NoProfileDataScreen';
import UserMenuScreen from '../screens/withAuth/Weighin/UserMenu/UserMenuScreen';
import ManualWeighInScreen from '../screens/withAuth/Weighin/ManualWeighInScreen';
import EditProfileScreen from '../screens/withAuth/Weighin/UserMenu/EditProfileScreen';
import EditPlanScreen from '../screens/withAuth/Plan/EditPlanScreen';
import NotFoundScreen from '../screens/NotFoundScreen';

import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './BottomTabNavigator';

import useDataStore, { IDataStore } from '../hooks/useDataStore';
import { auth } from '../firebase/firebase';
import CreatePlanScreen from '../screens/withAuth/CreatePlanScreen';
import GoBack from '../components/IconButtons/GoBack';
import Close from '../components/IconButtons/Close';

import { RootStackParamList } from '../types';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator() {
  const nav = useNavigation();
  const [uid, profileData] = useDataStore(
    (state: IDataStore) => [state.profileData, state.uid],
    shallow,
  );

  React.useEffect(() => {
    if (!uid) {
      nav.navigate('Intro');
    }

    if (uid && !profileData) {
      nav.navigate('NoProfileData');
    }

    if (uid && profileData) {
      nav.navigate('Root');
    }
  }, [uid, profileData, nav]);

  return (
    <Stack.Navigator>
      {/* no authorized user */}
      {!uid && (
      <Stack.Group>
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
      </Stack.Group>
      )}

      {/* user is authorized but profile is not completed */}
      {uid && !profileData && (
      <Stack.Screen
        name="NoProfileData"
        component={NoProfileDataScreen}
        options={({ navigation }) => ({
          title: 'Profile Data',
          headerTitleAlign: 'center',
          headerLeft: () => (
            <GoBack onPress={() => auth
              .signOut()
              .then(() => {
                navigation.navigate('Intro');
              })
              .catch((e) => Alert.alert('Error', e))}
            />
          ),
        })}
      />
      )}

      {/* user is authorized and profile is filled out */}
      {uid && profileData && (
      <Stack.Group>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
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
      </Stack.Group>
      )}

      {/* no authorized user and something is wrong */}
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Navigator />
    </NavigationContainer>
  );
}
