import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform, StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NameInput from '../../../../components/EditProfile/NameInput';
import DOBInput from '../../../../components/EditProfile/DOBInput';
import { View } from '../../../../components/Themed';
import useAuthentication from '../../../../hooks/useAuthentification';

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function UserMenuScreen() {
  const { user } = useAuthentication();

  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-circle-o"
        size={100}
        color="grey"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      />
      {user && (
      <>
        <NameInput user={user} />
        <DOBInput user={user} />
      </>
      )}
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
