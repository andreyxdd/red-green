import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard, Dimensions,
} from 'react-native';
import { User } from 'firebase/auth';
import { useTailwind } from 'tailwind-rn';
import shallow from 'zustand/shallow';
import { updateUserUnits } from '../../firebase';
import useStore, { IStore } from '../../hooks/useStore';
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
  user: User;
}

function UnitToggle({ user }:IUnitToggle) {
  const tailwind = useTailwind();
  const [uid, baseData] = useStore((state: IStore) => [state.uid, state.baseData], shallow);
  const [units, setUnits] = React.useState<UNITS>(UNITS.METRIC);

  React.useEffect(() => {
    if (baseData) setUnits(baseData.units);
  }, [baseData]);

  return (
    <View>
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Units</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            if (uid) updateUserUnits(uid, UNITS.METRIC);
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
            updateUserUnits(user.uid, UNITS.IMPERIAL);
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
