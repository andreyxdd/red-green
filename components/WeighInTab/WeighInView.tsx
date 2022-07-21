import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Subheading, Headline } from 'react-native-paper';
import colors from '../../styles/colors';
import { fullHeight } from '../../styles/theme';
import { IBodyMeasure } from '../../types/data';
import { MANUAL_WEIGHIN, SIGNS, UNITS } from '../../types/enums';

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
  currentWeighIn: IBodyMeasure;
  uid: string;
  planId: string;
  historyId: string;
  units: UNITS;
  profileWeight: IBodyMeasure;
}

function WeighInView({
  sign, currentWeighIn, uid, planId, historyId, units, profileWeight,
}: IWeighInView) {
  const { navigate } = useNavigation();
  const currentWeighInValue = React.useMemo(
    () => currentWeighIn[units].integer + currentWeighIn[units].fraction / 10,
    [units, currentWeighIn],
  );

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
          {currentWeighInValue}
          {' '}
          {units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
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
            isImperialUnits: (units === UNITS.IMPERIAL),
            profileWeight,
          });
        }}
      >
        Edit weigh-in
      </Button>
    </View>

  );
}

export default WeighInView;
