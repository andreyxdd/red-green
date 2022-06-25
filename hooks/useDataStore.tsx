import create from 'zustand';
import { IProfileData, IPlan, IHistoryItem } from '../types';

export type IUserData = {
  uid: string | null;
  profileData: IProfileData | null;
  plans: Array<IPlan>;
  plan: IPlan | null; // plan to show
  history: Array<IHistoryItem>; // history to show
}

/* eslint-disable no-unused-vars */
export interface IDataStore extends IUserData{
  setUID: (uid: string | null) => void;
  setProfileData: (profileData: IProfileData | null) => void;
  setPlans: (plans: Array<IPlan>) => void;
  setPlan: (activePlan: IPlan | null) => void;
  setHistory: (history: Array<IHistoryItem>) => void;
}
/* eslint-enable no-unused-vars */

const initialState = {
  uid: null,
  profileData: null,
  plans: [],
  plan: null,
  history: [],
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDataStore = create<IDataStore>((set: any) => ({
  ...initialState,
  setUID: (uid: string | null) => set({ uid }),
  setProfileData: (profileData: IProfileData | null) => set({ profileData }),
  setPlans: (plans: Array<IPlan>) => set({ plans }),
  setPlan: (plan: IPlan | null) => set({ plan }),
  setHistory: (history: Array<IHistoryItem>) => set({ history }),
}));

export default useDataStore;
