import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
// import useStore, { IStore } from './useStore';
import useAuthentification from './useAuthentification';
import { streamHistory } from '../firebase';

const useHistory = () => {
  const { user } = useAuthentification();
  // const uid = useStore((state: IStore) => state.uid);

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    async function fetchStream() {
      if (user) {
        unsubscribe = await streamHistory(
          user.uid,
          (querySnapshot) => {
            const res = querySnapshot.docs;
            res.forEach((d) => { console.log(d.data()); });
            // if (res[0]) console.log(res[0].data()['weight-in']);
            // else console.log('No weight-in today yet');
          },
          (error: FirestoreError) => Alert.alert(error.toString()),
        );
      }
    }

    fetchStream();

    return unsubscribe;
  }, [user]);
};

export default useHistory;
