import { FontAwesome } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Pressable, View } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import IntroScreen from '../screens/IntroScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import UserMenuScreen from '../screens/UserMenuScreen';
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
  const colorScheme = useColorScheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Intro"
        component={IntroScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Intro')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color={Colors[colorScheme].text}
              />
            </Pressable>
          ),
        })}
        name="SignIn"
        component={SignInScreen}
      />
      <Stack.Screen
        options={({ navigation }) => ({
          title: '',
          headerTransparent: true,
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.navigate('Intro')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="chevron-left"
                size={24}
                color={Colors[colorScheme].text}
              />
            </Pressable>
          ),
        })}
        name="SignUp"
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
        }}
      >
        <Stack.Screen
          name="UserMenu"
          component={UserMenuScreen}
          options={({ navigation }) => ({
            title: '',
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
                  size={24}
                  color={Colors[colorScheme].text}
                />
              </Pressable>
            ),
          })}
        />
      </Stack.Group>
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
