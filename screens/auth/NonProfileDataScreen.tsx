import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import ProfileForm from '../../components/forms/ProfileForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

function NonProfileDataScreen() {
  const user = useDataStore((state: IDataStore) => state.user);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { flex: 1 }]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      {user ? (
        <ProfileForm uid={user.uid} />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default NonProfileDataScreen;
