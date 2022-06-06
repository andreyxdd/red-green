import React from 'react';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { User } from 'firebase/auth';
import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../Themed';
import { getUserData, updateUserName } from '../../firebase';

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

export default function NameInput({ user }: INameInput) {
  const tailwind = useTailwind();
  const inputRef = React.useRef<TextInput | null>(null);
  const [name, setName] = React.useState('');

  const handleSubmitEditing = () => {
    if (user) updateUserName(user.uid, name);
  };

  React.useEffect(() => {
    const fetch = async () => {
      const userName = (await getUserData(user.uid))?.data()?.name;
      if (userName) setName(userName);
    };
    fetch();
  }, [user.uid]);

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
