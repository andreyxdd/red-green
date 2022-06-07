import React from 'react';
import { Alert } from 'react-native';

import { FirestoreError } from 'firebase/firestore';
import useAuthentification from './useAuthentification';
import useStore, { IStore } from './useStore';
import { streamUser } from '../firebase';

const useUserData = () => {
  const { user } = useAuthentification();
  const setUserData = useStore((state: IStore) => state.setUserData);
  const [isLoadingComplete, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    if (user && user.uid) {
      setIsLoading(false);

      unsubscribe = streamUser(
        user.uid,
        (docSnapshot) => {
          const res = docSnapshot?.data();
          if (res) {
            setUserData({
              uid: user.uid,
              name: res.name,
              units: res.units,
              dob: res.dob.toDate(),
            });
            setIsLoading(true);
          }
        },
        (error: FirestoreError) => Alert.alert(error.toString()),
      );
    }

    return unsubscribe;
  }, [user, setUserData]);

  return isLoadingComplete;
};

export default useUserData;
