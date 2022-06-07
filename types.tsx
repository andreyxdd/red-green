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
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  UserMenu: undefined;
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

// User data types

export const enum UNITS {
  METRIC = 'METRIC',
  IMPERIAL = 'IMPERIAL',
}

const enum PLANS {
  MAINTENANCE = 'MAINTENANCE',
  LOSING = 'LOSING',
}
export type IHistory = {
  date: Date;
  weightIn: number;
}

export type IPlan = {
  history: Array<IHistory>;
  type: PLANS;
  startDate: Date;
  endDate: Date;
  goalWieght: number;
  active: boolean;
}

export type IUserData = {
  uid?: string;
  name?: string;
  dob?: Date;
  units?: UNITS;
  height?: number;
  weight?: number;
  plans?: Array<IPlan>
}
