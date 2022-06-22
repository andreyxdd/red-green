import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard, Dimensions,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { updateUserUnits } from '../../firebase';
import useAuthentification from '../../hooks/useAuthentification';
import { UNITS } from '../../types';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth * 0.8,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 18,
    textAlign: 'center',
  },
  inputText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
  },
});

interface IUnitToggle {
  unitsDB: UNITS;
  height: number;
  weight: number;
}

function UnitToggle({ unitsDB, height, weight }:IUnitToggle) {
  const tailwind = useTailwind();

  const { user } = useAuthentification();

  const [units, setUnits] = React.useState<UNITS>(UNITS.METRIC);

  React.useEffect(() => { setUnits(unitsDB); }, [unitsDB]);

  return (
    <View>
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Units</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            if (user) updateUserUnits(user.uid, UNITS.METRIC, height, weight);
            setUnits(UNITS.METRIC);
          }}
        >
          <View style={{
            borderBottomWidth: units === UNITS.METRIC ? 2 : 0,
            borderColor: units === UNITS.METRIC ? '#003F5E' : 'transparent',
          }}
          >
            <Text style={[tailwind('text-text'), styles.inputText]}>Metric (cm, kg)</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            if (user) updateUserUnits(user.uid, UNITS.IMPERIAL, height, weight);
            setUnits(UNITS.IMPERIAL);
          }}
        >
          <View style={{
            borderBottomWidth: units === UNITS.IMPERIAL ? 2 : 0,
            borderColor: units === UNITS.IMPERIAL ? '#003F5E' : 'transparent',
          }}
          >
            <Text style={[tailwind('text-text'), styles.inputText]}>Imperial (ft, lbs)</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default UnitToggle;
