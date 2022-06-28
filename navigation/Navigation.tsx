import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import shallow from 'zustand/shallow';

import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import LinkingConfiguration from './LinkingConfiguration';
import WithAuthStack from './WithAuthStack';
import NoProfileStack from './NoProfileStack';
import NoAuthStack from './NoAuthStack';

import useDataStore, { IDataStore } from '../hooks/useDataStore';

function Navigation() {
  const [uid, profileData] = useDataStore(
    (state: IDataStore) => [state.profileData, state.uid],
    shallow,
  );

  if (false) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
      }}
      >
        <ActivityIndicator animating />
      </View>
    );
  }

  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {uid ? (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <>
          {profileData ? <WithAuthStack /> : <NoProfileStack />}
        </>
      ) : <NoAuthStack />}
    </NavigationContainer>
  );
}

export default Navigation;
