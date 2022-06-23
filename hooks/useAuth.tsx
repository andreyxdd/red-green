import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import useStore, { IStore } from './useStore';
import { auth } from '../firebase';

function useAuth() {
  const setUID = useStore((state: IStore) => state.setUID);

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
