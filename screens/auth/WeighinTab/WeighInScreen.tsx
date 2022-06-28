import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Headline, Text } from 'react-native-paper';
import shallow from 'zustand/shallow';

import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import useInterfaceStore, { IInterfaceStore } from '../../../hooks/useInterfaceStore';

import { MANUAL_WEIGHIN, SIGNS } from '../../../types/enums';
import { AuthBottomTabProps } from '../../../types/navigation';
import { getRelativeChange } from '../../../utils/calculate';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
});

export default function WeighInScreen({ navigation: { navigate } }: AuthBottomTabProps<'WeighInTab'>) {
  const [user, history, plan] = useDataStore(
    (state: IDataStore) => [state.user, state.history, state.plan],
    shallow,
  );
  const setSign = useInterfaceStore((state: IInterfaceStore) => state.setSign);

  React.useEffect(() => {
    if (history.length > 0
        && plan
        && history[0].date.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0)
      && plan.active) {
      const relativeChange = getRelativeChange(plan.goalWeight, history[0].weightIn); // in %

      if (relativeChange > 2.0) {
        setSign(SIGNS.RED);
      } else if (relativeChange < 0.0) {
        setSign(SIGNS.GREEN);
      } else {
        setSign(SIGNS.YELLOW);
      }
    }
  }, [history, plan, setSign]);

  if (!plan || !plan.active) {
    return (
      <View style={[styles.container, { flex: 1 }]}>
        <Headline style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
          No Active plans
        </Headline>
        <Button
          mode="contained"
          style={{ width: '100%', marginVertical: 12 }}
          onPress={() => { navigate('CreatePlan'); }}
        >
          Create new plan
        </Button>
      </View>
    );
  }

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {(
        history.length > 0
        && history[0].date.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0)
      ) ? (
        <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
          <Headline style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
            Today&apos;s Weigh-In:
          </Headline>
          <Text style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
            {history[0].weightIn}
          </Text>
          <Button
            mode="contained"
            style={{ width: '100%', marginVertical: 12 }}
            onPress={() => {
              navigate('ManualWeighIn', {
                screenType: MANUAL_WEIGHIN.EDIT,
                currentWeighIn: history[0].weightIn,
                uid: user ? user.uid : '',
                planId: plan.id,
                historyId: history[0].id,
              });
            }}
          >
            Edit weigh-in
          </Button>
        </View>
        ) : (
          <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
            <Headline style={{
              width: '100%',
              marginVertical: 12,
              textAlign: 'center',
            }}
            >
              It&apos;s time to weigh-in
            </Headline>
            <Button
              mode="contained"
              disabled
              style={{ width: '100%', marginVertical: 12 }}
            >
              Sync with the health app
            </Button>
            <Button
              mode="contained"
              style={{ width: '100%', marginVertical: 12 }}
              onPress={() => {
                navigate('ManualWeighIn', {
                  screenType: MANUAL_WEIGHIN.INPUT,
                  uid: user ? user.uid : '',
                  planId: plan.id,
                  historyId: history[0].id,
                });
              }}
            >
              Weigh-in manually
            </Button>
          </View>
        )}
    </View>
  );
}
