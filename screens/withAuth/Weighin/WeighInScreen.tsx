import { Button, Headline, Text } from 'react-native-paper';
import React from 'react';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import useInterfaceStore, { IInterfaceStore } from '../../../hooks/useInterfaceStore';

import Container from '../../../components/Container';
import { RootTabScreenProps, SIGNS } from '../../../types';
import { getRelativeChange } from '../../../utils/calculate';

export default function WeighInScreen({ navigation: { navigate } }: RootTabScreenProps<'TabTwo'>) {
  const [history, plan] = useDataStore((state: IDataStore) => [state.history, state.plan]);
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
      <Container style={{ flex: 1 }}>
        <Container style={{ width: '80%' }}>
          <Headline style={{ width: '100%', marginVertical: 12 }}>No Active plans</Headline>
          <Button
            mode="contained"
            style={{ width: '100%', marginVertical: 12 }}
            onPress={() => { navigate('CreatePlan'); }}
          >
            Create new plan
          </Button>
        </Container>
      </Container>
    );
  }

  return (
    <Container style={{ flex: 1 }}>
      {(
        history.length > 0
        && history[0].date.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0)
      ) ? (
        <Container style={{ width: '80%' }}>
          <Headline style={{ width: '100%', marginVertical: 12 }}>Todays weight-in:</Headline>
          <Text style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>{history[0].weightIn}</Text>
          <Button
            mode="contained"
            style={{ width: '100%', marginVertical: 12 }}
            onPress={() => {
              navigate('ManualWeighIn', { screenType: 'edit', value: history[0].weightIn });
            }}
          >
            Edit weigh-in
          </Button>
        </Container>
        ) : (
          <Container style={{ width: '80%' }}>
            <Headline style={{ width: '100%', marginVertical: 12 }}>It&apos;s time to weigh-in</Headline>
            <Button
              mode="contained"
              disabled
              style={{ width: '100%', marginVertical: 12 }}
            >
              Sync with a health app
            </Button>
            <Button
              mode="contained"
              style={{ width: '100%', marginVertical: 12 }}
              onPress={() => {
                navigate('ManualWeighIn', { screenType: 'input' });
              }}
            >
              Weigh-in manually
            </Button>
          </Container>
        )}
    </Container>
  );
}
