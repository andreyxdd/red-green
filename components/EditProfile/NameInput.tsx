import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import shallow from 'zustand/shallow';
import { Text, View } from '../Themed';
import { updateUserName } from '../../firebase';
import useStore, { IStore } from '../../hooks/useStore';

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

export default function NameInput() {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [name, setName] = React.useState('');
  const [uid, baseData] = useStore((state: IStore) => [state.uid, state.baseData], shallow);

  const handleSubmitEditing = () => {
    if (uid) updateUserName(uid, name);
  };

  React.useEffect(() => {
    if (baseData) setName(baseData.name);
  }, [baseData]);

  const handleChange = (newName: string) => {
    setName(newName);
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
          value={name}
          returnKeyType="done"
        />
      </View>
    </TouchableOpacity>
  );
}
