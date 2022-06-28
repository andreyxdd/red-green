import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import shallow from 'zustand/shallow';

import LinkingConfiguration from './LinkingConfiguration';
import WithAuthStack from './WithAuthStack';
import NoProfileStack from './NoProfileStack';
import NoAuthStack from './NoAuthStack';

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
          {profileData ? <WithAuthStack /> : <NoProfileStack />}
        </>
      ) : <NoAuthStack />}
    </NavigationContainer>
  );
}

export default Navigation;
