import React from 'react';
import {
  StyleSheet, TouchableOpacity, TextInput, Alert,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../Themed';
import useAuthentification from '../../hooks/useAuthentification';
import { updateUserWeight } from '../../firebase';

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

interface IWeightInput{
  value: number;
}

export default function WeightField({ value }:IWeightInput) {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [weight, setWeight] = React.useState<number>();

  const { user } = useAuthentification();

  React.useEffect(() => { setWeight(value); }, [value]);

  const handleSubmitEditing = () => {
    if (user && weight) updateUserWeight(user.uid, weight);
  };

  const handleChange = (newWeight: string) => {
    if (newWeight.match(/^-?\d*(\.\d+)?$/)) {
      setWeight(Number(newWeight));
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
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Weight</Text>
      <View style={tailwind('flex items-center flex-row')}>
        {weight ? (
          <TextInput
            keyboardType="numeric"
            style={[tailwind('text-text'), styles.inputText, { paddingVertical: 0 }]}
            onChangeText={handleChange}
            onSubmitEditing={handleSubmitEditing}
            ref={inputRef}
            value={weight.toFixed(1)}
            returnKeyType="done"
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
