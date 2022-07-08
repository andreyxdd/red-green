import React from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import { useCollection } from 'react-firebase-hooks/firestore';

import useDataStore, { IDataStore } from './useDataStore';
import { db } from '../firebase/firebase';
import { IHistoryItem } from '../types/data';

const useHistory = () => {
  const [user, plan, setHistory, setTodayHistoryItem] = useDataStore(
    (state: IDataStore) => [state.user, state.plan, state.setHistory, state.setTodayHistoryItem],
    shallow,
  );

  const [value, loading, error] = useCollection(
    user && plan && query(
      collection(db, 'users', user.uid, 'plans', plan.id, 'history'),
      orderBy('date', 'asc'),
    ),
  );

  React.useEffect(() => {
    const result = value?.docs;
    if (result) {
      const planHistory: Array<IHistoryItem> = result.map((doc) => {
        const {
          date, weighIn, dailyGoal, sign,
        } = doc.data();

        return ({
          id: doc.id,
          date: date.toDate(),
          weighIn,
          dailyGoal,
          sign,
        });
      });
      setHistory(planHistory);

      const todayHistoryItem = planHistory.find(
        (item: IHistoryItem) => item.date.setHours(0, 0, 0, 0)
          === (new Date()).setHours(0, 0, 0, 0),
      );
      if (todayHistoryItem) {
        setTodayHistoryItem(todayHistoryItem);
      } else {
        setTodayHistoryItem(null);
      }
    } else {
      setHistory([]);
      setTodayHistoryItem(null);
    }
  }, [setHistory, setTodayHistoryItem, value]);

  return { loading, error };
};

export default useHistory;
