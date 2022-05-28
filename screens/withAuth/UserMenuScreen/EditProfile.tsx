import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform, StyleSheet, TouchableOpacity, TextInput,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../../../components/Themed';
import useAuthentication from '../../../hooks/useAuthentification';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    color: 'grey',
    fontWeight: '800',
    fontSize: 18,
  },
  formInput: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#435A71',
    zIndex: 1,

  },
});

export default function UserMenuScreen() {
  const tailwind = useTailwind();
  const { user } = useAuthentication();

  const emailRef = React.useRef<TextInput | null>(null);

  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="grey"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      />
      <TouchableOpacity
        style={styles.formInput}
        onPress={() => {
          if (emailRef.current) { emailRef.current.focus(); }
        }}
      >
        <Text style={[tailwind('text-placeholder'), styles.inputText]}>Name</Text>
        <View style={tailwind('flex items-center flex-row')}>
          <TextInput
            style={[tailwind('text-text'), styles.inputText, { paddingVertical: 0 }]}
            onChangeText={(text: string) => console.log(`Change text to ${text}`)}
            ref={emailRef}
            value={`${user?.email}`}
            returnKeyType="done"
          />
        </View>
      </TouchableOpacity>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
