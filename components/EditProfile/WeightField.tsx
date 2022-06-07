import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
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

const converter = 2.20462;
function adjustWeight(currentUnits: UNITS, weight: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return weight * converter;
  }
  return weight;
}

export default function NameInput() {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [weight, setWeight] = React.useState<number>();
  const baseData = useStore((state: IStore) => state.baseData);

  React.useEffect(() => {
    if (baseData) setWeight(baseData.weight);
  }, [baseData]);

  return (
    <TouchableOpacity
      style={styles.formInput}
      onPress={() => {
        if (inputRef.current) { inputRef.current.focus(); }
      }}
    >
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Weight</Text>
      <View style={tailwind('flex items-center flex-row')}>
        {baseData && weight ? (
          <Text style={[
            tailwind('text-text'),
            styles.inputText,
            { paddingVertical: 0 }]}
          >
            {adjustWeight(baseData.units, weight).toFixed(1)}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
