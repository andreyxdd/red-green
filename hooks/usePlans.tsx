import React from 'react';
import { Alert } from 'react-native';
import { FirestoreError } from 'firebase/firestore';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { streamPlans } from '../firebase/firebase';

const usePlans = () => {
  const [isLoaded, setLoaded] = React.useState(false);
  const [uid, setPlans, setPlan] = useDataStore(
    (state: IDataStore) => [state.uid, state.setPlans, state.setPlan],
    shallow,
  );

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unsubscribe = () => { };

    if (uid) {
      unsubscribe = streamPlans(
        uid,
        (querySnapshot) => {
          setLoaded(false);
          const result = querySnapshot.docs;
          if (result) {
            const userPlans = result.map((doc) => ({
              id: doc.id,
              type: doc.data().type,
              startDate: doc.data().startDate.toDate(),
              endDate: doc.data().endDate.toDate(),
              goalWeight: doc.data().goalWeight,
              active: doc.data().active,
            }));

            setPlans(userPlans);
            setPlan(userPlans[0]);
          } else {
            setPlans([]);
            setPlan(null);
          }
          setLoaded(true);
        },
        (error: FirestoreError) => {
          console.log(error.toString());
          Alert.alert(error.toString());
        },
      );
    } else {
      setPlans([]);
      setPlan(null);
      setLoaded(true);
    }

    return unsubscribe;
  }, [uid, setPlans, setPlan]);

  return isLoaded;
};

export default usePlans;
