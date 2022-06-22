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
import UserMenuScreen from '../screens/withAuth/Weighin/UserMenu/UserMenuScreen';
import EditProfileScreen from '../screens/withAuth/Weighin/UserMenu/EditProfileScreen';
import EditPlanScreen from '../screens/withAuth/Plan/EditPlanScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import BottomTabNavigator from './BottomTabNavigator';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { user } = useAuthentication();

  return (
    <Stack.Navigator>
      {!user ? (
        <>
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
        </>
      ) : (
        <>
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
        </>
      )}
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
