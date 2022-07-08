import { User } from 'firebase/auth';
import create from 'zustand';
import { IProfile, IPlan, IHistoryItem } from '../types/data';

export type IUserData = {
  user: User | null;
  profile: IProfile | null;
  plans: Array<IPlan>;
  plan: IPlan | null; // plan to show
  history: Array<IHistoryItem>; // history to show
  todayHistoryItem: IHistoryItem | null;
}

/* eslint-disable no-unused-vars */
export interface IDataStore extends IUserData{
  setUser: (user: User | null) => void;
  setProfile: (profile: IProfile | null) => void;
  setPlans: (plans: Array<IPlan>) => void;
  setPlan: (activePlan: IPlan | null) => void;
  setHistory: (history: Array<IHistoryItem>) => void;
  setTodayHistoryItem: (todayHistoryItem: IHistoryItem | null) => void;
}
/* eslint-enable no-unused-vars */

const initialState = {
  user: null,
  profile: null,
  plans: [],
  plan: null,
  history: [],
  todayHistoryItem: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useDataStore = create<IDataStore>((set: any) => ({
  ...initialState,
  setUser: (user: User | null) => set({ user }),
  setProfile: (profile: IProfile | null) => set({ profile }),
  setPlans: (plans: Array<IPlan>) => set({ plans }),
  setPlan: (plan: IPlan | null) => set({ plan }),
  setHistory: (history: Array<IHistoryItem>) => set({ history }),
  setTodayHistoryItem: (todayHistoryItem: IHistoryItem | null) => set({ todayHistoryItem }),
}));

export default useDataStore;
