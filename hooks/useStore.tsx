import create from 'zustand';
import { IUserData, UNITS } from '../types';

/* eslint-disable no-unused-vars */
export interface IStore extends IUserData{
  setUserData: (user: IUserData) => void,
}
/* eslint-enable no-unused-vars */

const initialState: IUserData = {
  uid: '',
  name: '',
  dob: new Date(),
  units: UNITS.METRIC,
  // plans: [],
};

const useStore = create<IStore>((set: any) => ({
  ...initialState,
  setUserData: ({
    uid, name, dob, units,
  }: IUserData) => set({
    uid, name, dob, units,
  }),
}));

export default useStore;
