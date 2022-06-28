import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import shallow from 'zustand/shallow';

import LinkingConfiguration from './LinkingConfiguration';
import AuthStack from './AuthStack';
import AuthNonProfileStack from './AuthNonProfileStack';
import NonAuthStack from './NonAuthStack';

import useDataStore, { IDataStore } from '../hooks/useDataStore';

function Navigation() {
  const [user, profileData] = useDataStore(
    (state: IDataStore) => [state.user, state.profileData],
    shallow,
  );

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {user ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {profileData ? <AuthStack /> : <AuthNonProfileStack />}
        </>
      ) : <NonAuthStack />}
    </NavigationContainer>
  );
}

export default Navigation;
