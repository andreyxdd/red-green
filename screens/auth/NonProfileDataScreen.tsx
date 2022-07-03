import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import ProfileForm from '../../components/Forms/ProfileForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
  },
});

function NonProfileDataScreen() {
  const user = useDataStore((state: IDataStore) => state.user);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      <Text style={{
        width: '90%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
      }}
      >
        Let&apos;s setup your profile:
      </Text>
      {user ? (
        <ProfileForm uid={user.uid} />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default NonProfileDataScreen;
