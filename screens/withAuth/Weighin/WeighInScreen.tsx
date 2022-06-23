import { Button, Headline, Text } from 'react-native-paper';
import useStore, { IStore } from '../../../hooks/useStore';

import Container from '../../../components/Container';
import { RootTabScreenProps } from '../../../types';

export default function WeighInScreen({ navigation: { navigate } }: RootTabScreenProps<'TabTwo'>) {
  const [history, plan] = useStore((state: IStore) => [state.history, state.plan]);

  return (
    <Container style={{ flex: 1 }}>
      {(
        history.length > 0
        && plan
        && history[0].date.setHours(0, 0, 0, 0) === (new Date()).setHours(0, 0, 0, 0)
        && plan.active
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
