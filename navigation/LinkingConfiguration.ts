/**
 * Learn more about deep linking with React Navigation
 */

import { LinkingOptions } from '@react-navigation/native';
import { createURL } from 'expo-linking';

import { AuthStackList, AuthNonProfileStackList, NonAuthStackList } from '../types/navigation';

const linking: LinkingOptions<AuthStackList|AuthNonProfileStackList|NonAuthStackList> = {
  prefixes: [createURL('/')],
  config: {
    screens: {
      Intro: 'intro',
      SignIn: 'sign-in',
      SignUp: 'sign-up',
      Root: {
        screens: {
          TodayTab: {
            screens: {
              TabOneScreen: 'one',
            },
          },
          WeighInTab: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          PlanTab: {
            screens: {
              TabThreeScreen: 'three',
            },
          },
        },
      },
      UserMenu: 'user-menu',
      EditProfile: 'edit-profile',
      EditPlan: 'edit-plan',
      // NotFound: '*',
    },
  },
};

export default linking;
