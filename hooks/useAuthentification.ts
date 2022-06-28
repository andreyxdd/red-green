import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { auth } from '../firebase/firebase';

function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const [setUID, setProfileData] = useDataStore(
    (state: IDataStore) => [state.setUID, state.setProfileData],
    shallow,
  );

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUID(currentUser.uid);
        setUser(currentUser);
      } else {
        // User is signed out
        setUID('');
        setProfileData(null);
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, [setUID, setProfileData]);

  return {
    user,
  };
}

export default useAuthentication;
