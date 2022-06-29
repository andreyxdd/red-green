import React from 'react';
import { StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDataStore, { IDataStore } from '../../../../hooks/useDataStore';

import ProfileForm from '../../../../components/forms/ProfileForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

function EditProfileScreen() {
  const [profileData, user] = useDataStore(
    (state: IDataStore) => [state.profileData, state.user],
    shallow,
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container, { flex: 1 }]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      {profileData && user ? (
        <ProfileForm uid={user.uid} initialValues={profileData} />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default EditProfileScreen;
