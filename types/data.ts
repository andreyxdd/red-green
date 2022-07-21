import { PLANS, SIGNS, UNITS } from './enums';

export type INumber = {
  integer: number;
  fraction: number;
}

// height or weight
export type IBodyMeasure = {
  METRIC: INumber,
  IMPERIAL: INumber,
}

export type IProfile = {
  name: string;
  dob: Date;
  units: UNITS;
  height: IBodyMeasure;
  weight: IBodyMeasure;
}

export type IPlan = {
  id: string;
  active: boolean;
  type: PLANS;
  goalWeight: IBodyMeasure;
  goalDate: Date;
  startDate: Date;
}

export type IHistoryItem = {
  id: string;
  sign: SIGNS | undefined;
  date: Date;
  weighIn: IBodyMeasure | undefined;
  dailyGoal: {
    METRIC: number,
    IMPERIAL: number,
  }
}
