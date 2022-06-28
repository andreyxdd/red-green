import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import useDataStore, { IDataStore } from './useDataStore';
import { auth } from '../firebase/firebase';

function useAuthentication() {
  const [user, loading, error] = useAuthState(auth);
  const setUser = useDataStore((state: IDataStore) => state.setUser);

  React.useEffect(() => {
    if (user) { setUser(user); } else { setUser(null); }
  }, [setUser, user]);

  return { loading, error };
}

export default useAuthentication;
