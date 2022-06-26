/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {
      later?: string;
    }
  }
}

export type RootStackParamList = {
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
  NoProfileData: undefined;
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  UserMenu: undefined;
  ManualWeighIn: { screenType: string, value?: number };
  CreatePlan: undefined;
  EditProfile: undefined;
  EditPlan: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
  TabThree: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
  >;

// User data types:

export const enum UNITS {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

export const enum PLANS {
  MAINTENANCE = 'MAINTENANCE',
  LOSING = 'LOSING',
}

export type IHistoryItem = {
  id: string;
  date: Date;
  weightIn: number;
}

export type IPlan = {
  id: string;
  type: PLANS;
  startDate: Date;
  endDate: Date;
  goalWeight: number;
  active: boolean;
}

export type IProfileData = {
  name: string;
  dob: Date;
  units: UNITS;
  height: number;
  weight: number;
}

// Interface types:

export const enum SIGNS {
  GREEN = 'GREEN',
  YELLOW = 'YELLOW',
  RED = 'RED',
}

export const enum PLAN_VIEWS {
  HISTORY = 'HISTORY',
  BREAKDOWN = 'BREAKDOWN',
}
