import React from 'react';
import shallow from 'zustand/shallow';
import { doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import useDataStore, { IDataStore } from './useDataStore';
import { db } from '../firebase/firebase';

const useProfile = () => {
  const [user, setProfileData] = useDataStore(
    (state: IDataStore) => [state.user, state.setProfileData],
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

      setProfileData({
        name,
        dob: dob.toDate(),
        units,
        height,
        weight,
      });
    } else {
      setProfileData(null);
    }
  }, [snapshot, setProfileData]);

  return { loading, error };
};

export default useProfile;
