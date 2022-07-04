import { PLANS, UNITS } from './enums';

export type IHistoryItem = {
  id: string;
  date: Date;
  weightIn: number;
}

export type IPlan = {
  id: string;
  type: PLANS;
  goalWeight: number;
  goalDate: Date;
  active: boolean;
}

export type IProfileData = {
  name: string;
  dob: Date;
  units: UNITS;
  height: number;
  weight: number;
}
