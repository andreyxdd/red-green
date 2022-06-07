import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import useStore, { IStore } from './useStore';
import { streamHistory } from '../firebase';

const useHistory = () => {
  const uid = useStore((state: IStore) => state.uid);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    async function fetchStream() {
      if (uid) {
        unsubscribe = await streamHistory(
          uid,
          (querySnapshot) => {
            const res = querySnapshot.docs;
            if (res[0]) console.log(res[0].data()['weight-in']);
            else console.log('No weight-in today yet');
          },
          (error: FirestoreError) => Alert.alert(error.toString()),
        );
      }
    }

    fetchStream();

    return unsubscribe;
  }, [uid]);
};

export default useHistory;
