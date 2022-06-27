import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useDataStore, { IDataStore } from './useDataStore';
import { auth } from '../firebase/firebase';

function useAuth() {
  const setUID = useDataStore((state: IDataStore) => state.setUID);

  const authChanged = React.useCallback((currentUser) => {
    if (currentUser) {
      setUID(currentUser.uid);
    } else {
      setUID(null); // User is signed out
    }
  }, [setUID]);

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, authChanged);
    return unsubscribeFromAuthStatuChanged;
  }, [authChanged]);
}

export default useAuth;
