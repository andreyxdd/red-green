import { PLANS, UNITS } from './enums';

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
