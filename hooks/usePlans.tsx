import React from 'react';
import { collection, query, orderBy } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import { useCollection } from 'react-firebase-hooks/firestore';

import useDataStore, { IDataStore } from './useDataStore';
import { db } from '../firebase/firebase';

const usePlans = () => {
  const [user, setPlans, setPlan] = useDataStore(
    (state: IDataStore) => [state.user, state.setPlans, state.setPlan],
    shallow,
  );

  const [value, loading, error] = useCollection(
    user && query(
      collection(db, 'users', user.uid, 'plans'),
      orderBy('active', 'desc'),
      orderBy('startDate', 'desc'),
    ),
  );

  React.useEffect(() => {
    const result = value?.docs;
    if (result) {
      const userPlans = result.map((doc) => {
        const {
          active, type, goalWeight, goalDate, startDate,
        } = doc.data();

        return ({
          id: doc.id,
          active,
          type,
          goalWeight,
          goalDate: goalDate.toDate(),
          startDate: startDate.toDate(),
        });
      });

      setPlans(userPlans);
      setPlan(userPlans[0]);
    } else {
      setPlans([]);
      setPlan(null);
    }
  }, [setPlan, setPlans, value]);

  return { loading, error };
};

export default usePlans;
