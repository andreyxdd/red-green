import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { streamProfileData } from '../firebase/firebase';

const useProfileData = () => {
  const [isLoaded, setLoaded] = React.useState(false);
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
          setLoaded(false);
          const result = querySnapshot.data();
          if (result && Object.keys(result).length !== 0) {
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
          setLoaded(true);
        },
        (error: FirestoreError) => {
          Alert.alert(error.toString());
        },
      );
    } else {
      setProfileData(null);
      setLoaded(true);
    }

    return unsubscribe;
  }, [uid, setProfileData]);

  return isLoaded;
};

export default useProfileData;
