import React from 'react';
import { View, StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import CreatNewPlanView from '../../../components/WeighInTab/CreatNewPlanView';
import Greeting from '../../../components/WeighInTab/Greeting';
import NoWeighInView from '../../../components/WeighInTab/NoWeighInView';
import WeighInView from '../../../components/WeighInTab/WeighInView';

import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import useInterfaceStore, { IInterfaceStore } from '../../../hooks/useInterfaceStore';
import { IHistoryItem } from '../../../types/data';

import { SIGNS, UNITS } from '../../../types/enums';
import { getRelativeChange } from '../../../utils/calculate';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

function WeighInScreen() {
  const [user, profileData, history, plan] = useDataStore(
    (state: IDataStore) => [state.user, state.profileData, state.history, state.plan],
    shallow,
  );
  const [sign, setSign] = useInterfaceStore(
    (state: IInterfaceStore) => [state.sign, state.setSign],
    shallow,
  );

  const todaysHistoryItem = React.useMemo(() => history.find(
    (item: IHistoryItem) => item.date.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0),
  ), [history]);

  React.useEffect(() => {
    if (
      history.length > 0 && todaysHistoryItem && todaysHistoryItem.weighIn
      && plan && plan.active
    ) {
      const relativeChange = getRelativeChange(
        todaysHistoryItem.dailyGoal,
        todaysHistoryItem.weighIn,
      ); // in %

      if (relativeChange > 2.0) {
        setSign(SIGNS.RED);
      } else if (relativeChange < 0.0) {
        setSign(SIGNS.GREEN);
      } else {
        setSign(SIGNS.YELLOW);
      }
    } else {
      setSign(undefined);
    }
  }, [history, plan, setSign, todaysHistoryItem]);

  if ((!plan || !plan.active) && profileData) {
    return (
      <CreatNewPlanView name={profileData.name} />
    );
  }

  if (user && plan && profileData && todaysHistoryItem) {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        {profileData ? <Greeting name={profileData.name} /> : null}
        {(
          history.length > 0 && todaysHistoryItem.weighIn && sign
        ) ? (
          <WeighInView
            currentWeighIn={todaysHistoryItem.weighIn}
            sign={sign}
            uid={user.uid}
            planId={plan.id}
            historyId={todaysHistoryItem.id}
            isImperialUnits={profileData.units === UNITS.IMPERIAL}
          />
          ) : (
            <NoWeighInView
              uid={user.uid}
              planId={plan.id}
              historyId={todaysHistoryItem.id}
              isImperialUnits={profileData.units === UNITS.IMPERIAL}
            />
          )}
      </View>
    );
  }

  return null;
}

export default WeighInScreen;
