import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import {
  ColorSchemeName, Pressable, View,
} from 'react-native';

import useAuthentication from '../hooks/useAuthentification';

import IntroScreen from '../screens/noAuth/IntroScreen';
import SignInScreen from '../screens/noAuth/SignInScreen';
import SignUpScreen from '../screens/noAuth/SignUpScreen';
import NoProfileDataScreen from '../screens/withAuth/NoProfileDataScreen';
import UserMenuScreen from '../screens/withAuth/Weighin/UserMenu/UserMenuScreen';
import ManualWeighInScreen from '../screens/withAuth/Weighin/ManualWeighInScreen';
import EditProfileScreen from '../screens/withAuth/Weighin/UserMenu/EditProfileScreen';
import EditPlanScreen from '../screens/withAuth/Plan/EditPlanScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import BottomTabNavigator from './BottomTabNavigator';
import useDataStore, { IDataStore } from '../hooks/useDataStore';
import { auth } from '../firebase';
import CreatePlanScreen from '../screens/withAuth/CreatePlanScreen';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user } = useAuthentication();
  const profileData = useDataStore((state: IDataStore) => state.profileData);

  if (!user) {
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
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('Intro')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="chevron-left"
                  size={30}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={({ navigation }) => ({
            title: 'Sign Up',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('Intro')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="chevron-left"
                  size={30}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    );
  }

  if (user && !profileData) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="NoProfileData"
          component={NoProfileDataScreen}
          options={({ navigation }) => ({
            title: 'Profile Data',
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Pressable
                onPress={() => auth
                  .signOut()
                  .then(() => {
                    navigation.navigate('Intro');
                  })
                  .catch((e) => console.log(e))}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="chevron-left"
                  size={30}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    );
  }

  if (user && profileData) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
          options={({ navigation }) => ({
            title: '',
            animation: 'slide_from_bottom',
            headerTransparent: true,
            headerLeft: () => <View style={{ marginLeft: 50 }} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('TabTwo')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="close"
                  size={32}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="CreatePlan"
          component={CreatePlanScreen}
          options={({ navigation }) => ({
            title: '',
            animation: 'slide_from_bottom',
            headerTransparent: true,
            headerLeft: () => <View style={{ marginLeft: 50 }} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('TabTwo')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="close"
                  size={32}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="ManualWeighIn"
          component={ManualWeighInScreen}
          options={({ navigation }) => ({
            title: '',
            animation: 'slide_from_bottom',
            headerTransparent: true,
            headerLeft: () => <View style={{ marginLeft: 50 }} />,
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate('TabTwo')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                hitSlop={50}
              >
                <FontAwesome
                  name="close"
                  size={32}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={({ navigation }) => ({
            title: 'Profile',
            headerTransparent: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('UserMenu')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="chevron-left"
                  size={32}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="EditPlan"
          component={EditPlanScreen}
          options={({ navigation }) => ({
            title: 'Edit Plan',
            headerTransparent: true,
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.navigate('TabThree')}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
              >
                <FontAwesome
                  name="chevron-left"
                  size={32}
                  color="grey"
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
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
      <RootNavigator />
    </NavigationContainer>
  );
}
