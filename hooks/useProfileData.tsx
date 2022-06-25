import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { streamProfileData } from '../firebase';

const useProfileData = () => {
  const [uid, setProfileData] = useDataStore(
    (state: IDataStore) => [state.uid, state.setProfileData],
    shallow,
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    if (uid) {
      unsubscribe = streamProfileData(
        uid,
        (querySnapshot) => {
          const result = querySnapshot.data();
          if (result) {
            const {
              name, dob, units, height, weight,
            } = result;
            setProfileData({
              name,
              dob: dob.toDate(),
              units,
              height,
              weight,
            });
          } else {
            setProfileData(null);
          }
        },
        (error: FirestoreError) => {
          console.log(error.toString());
          Alert.alert(error.toString());
        },
      );
    }

    return unsubscribe;
  }, [uid, setProfileData]);
};

export default useProfileData;
