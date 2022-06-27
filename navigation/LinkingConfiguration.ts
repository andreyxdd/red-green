/**
 * Learn more about deep linking with React Navigation
 */

import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      Intro: 'intro',
      SignIn: 'sign-in',
      SignUp: 'sign-up',
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          TabThree: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
        },
      },
      UserMenu: 'user-menu',
      EditProfile: 'edit-profile',
      NotFound: '*',
    },
  },
};

export default linking;
