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
  height: 0,
  weight: 0,
  // plans: [],
};

const useStore = create<IStore>((set: any) => ({
  ...initialState,
  setUserData: ({
    uid, name, dob, units, height, weight,
  }: IUserData) => set({
    uid, name, dob, units, height, weight,
  }),
}));

export default useStore;
