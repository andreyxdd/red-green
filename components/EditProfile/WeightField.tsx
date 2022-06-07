import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import shallow from 'zustand/shallow';
import { Text, View } from '../Themed';
import useStore, { IStore } from '../../hooks/useStore';
import { UNITS } from '../../types';

const styles = StyleSheet.create({
  inputText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 18,
    marginRight: 6,
  },
  formInput: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#435A71',
    zIndex: 1,
  },
});

function adjustWeight(currentUnits: UNITS, weight: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return weight * 2.20462;
  }
  return weight / 2.20462;
}

export default function NameInput() {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [weight, setWeight] = React.useState<number>();
  const [initWeightMetric, units] = useStore(
    (state: IStore) => [state.weight, state.units],
    shallow,
  );

  React.useEffect(() => {
    setWeight(initWeightMetric);
  }, [initWeightMetric, setWeight]);

  React.useEffect(() => {
    if (weight) setWeight(adjustWeight(units, weight));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  return (
    <TouchableOpacity
      style={styles.formInput}
      onPress={() => {
        if (inputRef.current) { inputRef.current.focus(); }
      }}
    >
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Weight</Text>
      <View style={tailwind('flex items-center flex-row')}>
        {weight ? (
          <Text style={[
            tailwind('text-text'),
            styles.inputText,
            { paddingVertical: 0 }]}
          >
            {weight.toFixed(1)}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
