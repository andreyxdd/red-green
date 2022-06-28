import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from './useDataStore';
import { auth } from '../firebase/firebase';

function useAuthentication() {
  const [isLoaded, setLoaded] = React.useState(false);
  const [setUID, setUserEmail] = useDataStore(
    (state: IDataStore) => [state.setUID, state.setUserEmail],
    shallow,
  );

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (currentUser) => {
      setLoaded(false);
      if (currentUser) {
        setUID(currentUser.uid);
        setUserEmail(currentUser.email);
      } else {
        // User is signed out
        setUID(null);
        setUserEmail(null);
      }
      setLoaded(true);
    });

    return unsubscribeFromAuthStatuChanged;
  }, [setUID, setUserEmail]);

  return isLoaded;
}

export default useAuthentication;
