import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import shallow from 'zustand/shallow';
import { Text, View } from '../Themed';
import { updateUserHeight } from '../../firebase';
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

const converter = 30.48;
function adjustHeight(currentUnits: UNITS, height: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return height / converter;
  }
  return height;
}

export default function NameInput() {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [height, setHeight] = React.useState<number>();
  const [uid, baseData] = useStore((state: IStore) => [state.uid, state.baseData], shallow);

  const handleSubmitEditing = () => {
    if (uid && baseData) updateUserHeight(uid, adjustHeight(baseData.units, baseData.height));
  };

  React.useEffect(() => {
    if (baseData) {
      setHeight(baseData.height);
    }
  }, [baseData]);

  const handleChange = (newHeight: string) => {
    if (newHeight.match(/^-?\d*(\.\d+)?$/)) {
      if (baseData) setHeight(adjustHeight(baseData.units, Number(newHeight)));
    } else {
      Alert.alert('Only number can be input');
    }
  };

  return (
    <TouchableOpacity
      style={styles.formInput}
      onPress={() => {
        if (inputRef.current) { inputRef.current.focus(); }
      }}
    >
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Height</Text>
      <View style={tailwind('flex items-center flex-row')}>
        {baseData && height ? (
          <TextInput
            keyboardType="numeric"
            style={[tailwind('text-text'), styles.inputText, { paddingVertical: 0 }]}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmitEditing}
            ref={inputRef}
            value={adjustHeight(baseData.units, baseData.height).toFixed(1)}
            returnKeyType="done"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
