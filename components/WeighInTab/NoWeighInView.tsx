import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading } from 'react-native-paper';
import { IWeight } from '../../types/data';
import { MANUAL_WEIGHIN } from '../../types/enums';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

interface IWeighInView{
  uid: string;
  planId: string;
  historyId: string;
  isImperialUnits: boolean;
  profileWeight: IWeight;
}

function WeighInView({
  uid, planId, historyId, isImperialUnits, profileWeight,
}: IWeighInView) {
  const { navigate } = useNavigation();
  return (
    <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
      <Subheading style={styles.text}>
        It&apos;s time to weigh-in
      </Subheading>
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
            uid,
            planId,
            historyId,
            isImperialUnits,
            profileWeight,
          });
        }}
      >
        Weigh-in manually
      </Button>
    </View>
  );
}

export default WeighInView;
