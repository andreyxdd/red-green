import create from 'zustand';
import { IProfileData, IPlan, IHistoryItem } from '../types';

export type IUserData = {
  uid: string | null;
  profileData: IProfileData | null;
  plans: Array<IPlan>;
  plan: IPlan | null; // plan to show
  history: Array<IHistoryItem>; // history to show
  dataIsLoading: boolean;
}

/* eslint-disable no-unused-vars */
export interface IStore extends IUserData{
  setUID: (uid: string | null) => void;
  setProfileData: (profileData: string | null) => void;
  setPlans: (plans: Array<IPlan>) => void;
  setPlan: (activePlan: IPlan | null) => void;
  setHistory: (history: Array<IHistoryItem>) => void;
  setDataIsLoading: (dataIsLoading: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState = {
  uid: null,
  profileData: null,
  plans: [],
  plan: null,
  history: [],
  dataIsLoading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDataStore = create<IStore>((set: any) => ({
  ...initialState,
  setUID: (uid: string | null) => set({ uid }),
  setProfileData: (profileData: string | null) => set({ profileData }),
  setPlans: (plans: Array<IPlan>) => set({ plans }),
  setPlan: (plan: IPlan | null) => set({ plan }),
  setHistory: (history: Array<IHistoryItem>) => set({ history }),
  setDataIsLoading: (dataIsLoading: boolean) => set({ dataIsLoading }),
}));

export default useDataStore;
