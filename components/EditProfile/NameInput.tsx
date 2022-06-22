import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../Themed';
import { updateUserName } from '../../firebase';
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

interface INameInput{
  name: string;
}

export default function NameInput({ name }: INameInput) {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [inputName, setInputName] = React.useState('');

  const { user } = useAuthentification();

  const handleSubmitEditing = () => {
    if (user && inputName) updateUserName(user.uid, inputName);
  };

  React.useEffect(() => { setInputName(name); }, [name]);

  const handleChange = (newName: string) => {
    setInputName(newName);
  };

  return (
    <TouchableOpacity
      style={styles.formInput}
      onPress={() => {
        if (inputRef.current) { inputRef.current.focus(); }
      }}
    >
      <Text style={[tailwind('text-placeholder'), styles.titleText]}>Name</Text>
      <View style={tailwind('flex items-center flex-row')}>
        <TextInput
          style={[tailwind('text-text'), styles.inputText, { paddingVertical: 0 }]}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmitEditing}
          ref={inputRef}
          value={inputName}
          returnKeyType="done"
        />
      </View>
    </TouchableOpacity>
  );
}
