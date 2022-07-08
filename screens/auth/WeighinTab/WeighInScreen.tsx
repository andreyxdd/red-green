import React from 'react';
import { View, StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import CreatNewPlanView from '../../../components/WeighInTab/CreatNewPlanView';
import Greeting from '../../../components/WeighInTab/Greeting';
import NoWeighInView from '../../../components/WeighInTab/NoWeighInView';
import WeighInView from '../../../components/WeighInTab/WeighInView';

import useDataStore, { IDataStore } from '../../../hooks/useDataStore';

import { UNITS } from '../../../types/enums';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

function WeighInScreen() {
  const [user, profile, history, plan, todayHistoryItem] = useDataStore(
    (state: IDataStore) => [
      state.user, state.profile, state.history, state.plan, state.todayHistoryItem,
    ],
    shallow,
  );

  if ((!plan || !plan.active) && profile) {
    return (
      <CreatNewPlanView name={profile.name} />
    );
  }

  if (user && plan && profile && todayHistoryItem) {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        {profile ? <Greeting name={profile.name} /> : null}
        {(
          history.length > 0 && todayHistoryItem && todayHistoryItem.weighIn
        ) ? (
          <WeighInView
            currentWeighIn={todayHistoryItem.weighIn}
            sign={todayHistoryItem.sign}
            uid={user.uid}
            planId={plan.id}
            historyId={todayHistoryItem.id}
            isImperialUnits={profile.units === UNITS.IMPERIAL}
          />
          ) : (
            <NoWeighInView
              uid={user.uid}
              planId={plan.id}
              historyId={todayHistoryItem.id}
              isImperialUnits={profile.units === UNITS.IMPERIAL}
            />
          )}
      </View>
    );
  }

  return null;
}

export default WeighInScreen;
