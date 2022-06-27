import React from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import useDataStore, { IDataStore } from './useDataStore';
import { auth } from '../firebase/firebase';

function useAuthentication() {
  const [user, setUser] = React.useState<User>();
  const setUID = useDataStore((state: IDataStore) => state.setUID);

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUID(currentUser.uid);
        setUser(currentUser);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, [setUID]);

  return {
    user,
  };
}

export default useAuthentication;
