import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { streamHistory } from '../firebase/firebase';
import { IHistoryItem } from '../types';

const useHistory = () => {
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
        },
        (error: FirestoreError) => {
          console.log(error.toString());
          Alert.alert(error.toString());
        },
      );
    }

    return unsubscribe;
  }, [uid, plan, setHistory]);
};

export default useHistory;
