import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { User } from 'firebase/auth';
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

interface INameInput {
  user: User;
}

function adjustHeight(currentUnits: UNITS, height: number) {
  if (currentUnits === UNITS.IMPERIAL) {
    return height / 30.48;
  }
  return height * 30.48;
}

export default function NameInput({ user }: INameInput) {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [height, setHeight] = React.useState<number>();
  const [initHeightMetric, units] = useStore(
    (state: IStore) => [state.height, state.units],
    shallow,
  );

  const handleSubmitEditing = () => {
    if (user && height) updateUserHeight(user.uid, adjustHeight(units, height));
  };

  React.useEffect(() => {
    setHeight(initHeightMetric);
  }, [initHeightMetric, setHeight]);

  React.useEffect(() => {
    if (height) setHeight(adjustHeight(units, height));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  const handleChange = (newHeight: string) => {
    if (newHeight.match(/^-?\d*(\.\d+)?$/)) {
      setHeight(adjustHeight(units, Number(newHeight)));
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
        {height ? (
          <TextInput
            keyboardType="numeric"
            style={[tailwind('text-text'), styles.inputText, { paddingVertical: 0 }]}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmitEditing}
            ref={inputRef}
            value={height.toFixed(1)}
            returnKeyType="done"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
