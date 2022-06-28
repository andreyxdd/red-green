/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Auth screen stack types:

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

// Auth screen and non-profile stack types:

export type NoProfileStackList = {
  NoProfileData: undefined;
  ReadTerms: undefined;
};

// Non-auth screen stack types:

export type NoAuthStackList = {
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

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
