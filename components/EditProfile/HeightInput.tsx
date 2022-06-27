import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../Themed';
import { updateUserHeight } from '../../firebase/firebase';
import useAuthentification from '../../hooks/useAuthentification';

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

interface IHeightInput{
  value: number;
}

export default function HeightInput({ value }:IHeightInput) {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [height, setHeight] = React.useState<number>();

  const { user } = useAuthentification();
  React.useEffect(() => { setHeight(value); }, [value]);

  const handleSubmitEditing = () => {
    if (user && height) updateUserHeight(user.uid, height);
  };

  const handleChange = (newHeight: string) => {
    if (newHeight.match(/^-?\d*(\.\d+)?$/)) {
      setHeight(Number(newHeight));
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
