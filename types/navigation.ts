import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { IPlan, IBodyMeasure } from './data';
import { MANUAL_WEIGHIN } from './enums';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends AuthStackList {
      later?: string;
    }
  }
}

// Auth screen stack types:
export type AuthBottomTabList = {
  TodayTab: undefined;
  WeighInTab: undefined;
  PlanTab: undefined;
};

export type AuthStackList = {
  Root: NavigatorScreenParams<AuthBottomTabList> | undefined;
  ManualWeighIn: {
    screenType: MANUAL_WEIGHIN,
    currentWeighIn?: IBodyMeasure,
    profileWeight: IBodyMeasure,
    uid: string,
    planId: string,
    historyId: string,
    isImperialUnits: boolean;
  };
  UserMenu: undefined;
  EditProfile: undefined;
  CreatePlan: undefined;
  EditPlan: {plan: IPlan};
  ReadTerms: undefined;
};

export type AuthStackScreenProps<Screen extends keyof AuthStackList> =
  NativeStackScreenProps< AuthStackList, Screen >;

export type AuthBottomTabProps<Screen extends keyof AuthBottomTabList> =
  CompositeScreenProps<
    BottomTabScreenProps<AuthBottomTabList, Screen>,
    NativeStackScreenProps<AuthStackList>
  >;
//--

// Auth screen and non-profile stack types:
export type AuthNonProfileStackList = {
  NoProfileData: undefined;
  ReadTerms: undefined;
};

export type AuthNonProfileStackScreenProps<Screen extends keyof AuthNonProfileStackList> =
  NativeStackScreenProps< AuthNonProfileStackList, Screen >;
//--

// Non-auth screen stack types:
export type NonAuthStackList = {
  Intro: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

export type NonAuthStackScreenProps<Screen extends keyof NonAuthStackList> =
  NativeStackScreenProps< NonAuthStackList, Screen >;
//--
