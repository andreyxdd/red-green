import React from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import { useCollection } from 'react-firebase-hooks/firestore';

import useDataStore, { IDataStore } from './useDataStore';
import { db } from '../firebase/firebase';
import { IHistoryItem } from '../types/data';

const useHistory = () => {
  const [user, plan, setHistory] = useDataStore(
    (state: IDataStore) => [state.user, state.plan, state.setHistory],
    shallow,
  );

  const [value, loading, error] = useCollection(
    user && plan && query(
      collection(db, 'users', user.uid, 'plans', plan.id, 'history'),
      orderBy('date', 'desc'),
    ),
  );

  React.useEffect(() => {
    const result = value?.docs;
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
  }, [setHistory, value]);

  return { loading, error };
};

export default useHistory;
