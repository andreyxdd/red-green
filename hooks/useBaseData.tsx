import React from 'react';
import { Alert } from 'react-native';

import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useStore, { IStore } from './useStore';
import { streamUser } from '../firebase';

const useBaseData = () => {
  const [uid, setBaseData] = useStore((state: IStore) => [state.uid, state.setBaseData], shallow);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    if (uid) {
      unsubscribe = streamUser(
        uid,
        (docSnapshot) => {
          const res = docSnapshot?.data();
          if (res) {
            setBaseData({
              name: res.name,
              units: res.units,
              dob: res.dob.toDate(),
              height: res.height,
              weight: res.weight,
            });
          }
        },
        (error: FirestoreError) => Alert.alert(error.toString()),
      );
    }

    return unsubscribe;
  }, [setBaseData, uid]);
};

export default useBaseData;
