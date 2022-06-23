import create from 'zustand';
import { UNITS } from '../types';

interface IBaseData{
  name: string;
  dob: Date | undefined;
  units: UNITS;
  height: number;
  weight: number
}

interface IState{
  uid: string;
  activePlanId: string;
  baseData?: IBaseData;
}

/* eslint-disable no-unused-vars */
export interface IStore extends IState{
  setUID: (uid: string) => void;
  setBaseData: (baseData: IBaseData) => void,
  setActivePlanId: (activePlanId: string) => void;
}
/* eslint-enable no-unused-vars */

const useStore = create<IStore>((set: any) => ({
  uid: '',
  activePlanId: '',
  setUID: (uid: string) => set({ uid }),
  setBaseData: (baseData: IBaseData) => set({ baseData }),
  setActivePlanId: (activePlanId: string) => set({ activePlanId }),
}));

export default useStore;
