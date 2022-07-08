import { PLANS, SIGNS, UNITS } from './enums';

export type IHistoryItem = {
  id: string;
  date: Date;
  weighIn: number | undefined;
  dailyGoal: number;
  sign: SIGNS;
}

export type IPlan = {
  id: string;
  type: PLANS;
  goalWeight: number;
  goalDate: Date;
  startDate: Date;
  active: boolean;
}

export type IProfileData = {
  name: string;
  dob: Date;
  units: UNITS;
  height: number;
  weight: number;
}

export type IProfile = {
  name: string;
  dob: Date;
  units: UNITS;
  height: {cm: number, mm: number};
  weight: {kg: number, fraction: number};
}
