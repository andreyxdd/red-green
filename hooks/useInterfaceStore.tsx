import create from 'zustand';
import { SIGNS } from '../types/enums';

export type IUserData = {
  sign: SIGNS;
  dataIsLoading: boolean;
}

/* eslint-disable no-unused-vars */
export interface IInterfaceStore extends IUserData{
  setSign: (sign: SIGNS) => void;
  setDataIsLoading: (dataIsLoading: boolean) => void;
}
/* eslint-enable no-unused-vars */

const initialState = {
  sign: SIGNS.YELLOW,
  dataIsLoading: false,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInterfaceStore = create<IInterfaceStore>((set: any) => ({
  ...initialState,
  setSign: (sign: SIGNS) => set({ sign }),
  setDataIsLoading: (dataIsLoading: boolean) => set({ dataIsLoading }),
}));

export default useInterfaceStore;
