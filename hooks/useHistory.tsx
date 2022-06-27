import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { streamHistory } from '../firebase/firebase';
import { IHistoryItem } from '../types';

const useHistory = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [uid, plan, setHistory] = useDataStore(
    (state: IDataStore) => [state.uid, state.plan, state.setHistory],
    shallow,
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    if (uid && plan) {
      unsubscribe = streamHistory(
        uid,
        plan.id,
        (querySnapshot) => {
          setLoaded(false);
          const result = querySnapshot.docs;
          if (result) {
            const planHistory: Array<IHistoryItem> = result.map((doc) => ({
              id: doc.id,
              date: doc.data().date.toDate(),
              weightIn: doc.data().weightIn,
            }));

            setHistory(planHistory);
          } else {
            setHistory([]);
          }
          setLoaded(true);
        },
        (error: FirestoreError) => {
          console.log(error.toString());
          Alert.alert(error.toString());
        },
      );
    } else {
      setHistory([]);
      setLoaded(true);
    }

    return unsubscribe;
  }, [uid, plan, setHistory]);

  return isLoaded;
};

export default useHistory;
