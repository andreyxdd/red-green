import { PLANS, SIGNS, UNITS } from './enums';

export type IWeight = {
  kg: number;
  kgFraction: number;
}

export type IGeneralWeight = { // can be both imperial and metric
  whole: number; fraction: number;
}

export type IHeight = {
  cm: number;
  mm: number;
}

export type IProfile = {
  name: string;
  dob: Date;
  units: UNITS;
  height: IHeight;
  weight: IWeight;
}

export type IPlan = {
  id: string;
  active: boolean;
  type: PLANS;
  goalWeight: IWeight;
  goalDate: Date;
  startDate: Date;
}

export type IHistoryItem = {
  id: string;
  sign: SIGNS | undefined;
  date: Date;
  weighIn: IWeight | undefined;
  dailyGoal: IWeight;
}
