import React from 'react';
import shallow from 'zustand/shallow';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import useDataStore, { IDataStore } from './useDataStore';
import { db } from '../firebase/firebase';

const useProfile = () => {
  const [user, setProfile] = useDataStore(
    (state: IDataStore) => [state.user, state.setProfile],
    shallow,
  );
  const [snapshot, loading, error] = useDocument(
    user && doc(db, 'users', user.uid),
  );

  React.useEffect(() => {
    const result = snapshot?.data();
    if (result && Object.keys(result).length !== 0) {
      const {
        name, dob, units, height, weight,
      } = result;

      setProfile({
        name,
        dob: dob.toDate(),
        units,
        height,
        weight,
      });
    } else {
      setProfile(null);
    }
  }, [snapshot, setProfile]);

  return { loading, error };
};

export default useProfile;
