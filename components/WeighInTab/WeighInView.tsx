import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading, Headline } from 'react-native-paper';
import colors from '../../styles/colors';
import { fullHeight } from '../../styles/theme';
import { MANUAL_WEIGHIN, SIGNS } from '../../types/enums';
import { KGtoLBS } from '../../utils/calculate';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  button: { width: '80%', paddingVertical: 4, marginVertical: 4 },
  text: { width: '100%', marginVertical: 20, textAlign: 'center' },
});

interface IWeighInView{
  sign: SIGNS;
  currentWeighIn: number;
  uid: string;
  planId: string;
  historyId: string;
  isImperialUnits: boolean;
}

function WeighInView({
  sign, currentWeighIn, uid, planId, historyId, isImperialUnits,
}: IWeighInView) {
  const { navigate } = useNavigation();
  return (
    <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
      <Subheading style={styles.text}>
        Today&apos;s Weigh-In:
      </Subheading>
      <View style={{
        width: fullHeight / 4,
        height: fullHeight / 4,
        marginBottom: 20,
        backgroundColor: colors[sign].secondary,
        borderColor: colors[sign].primary,
        borderRadius: fullHeight / 8,
        borderWidth: 4,
        justifyContent: 'center',
        alignSelf: 'center',
      }}
      >
        <Headline style={{ textAlign: 'center', fontWeight: '300' }}>
          {isImperialUnits ? KGtoLBS(currentWeighIn) : currentWeighIn}
          {' '}
          {isImperialUnits ? 'lbs' : 'kg'}
        </Headline>
      </View>
      <Button
        mode="contained"
        style={{ width: '100%', marginVertical: 12 }}
        onPress={() => {
          navigate('ManualWeighIn', {
            screenType: MANUAL_WEIGHIN.EDIT,
            currentWeighIn,
            uid,
            planId,
            historyId,
            isImperialUnits,
          });
        }}
      >
        Edit weigh-in
      </Button>
    </View>

  );
}

export default WeighInView;