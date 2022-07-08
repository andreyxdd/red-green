import React from 'react';
import { StyleSheet } from 'react-native';
import shallow from 'zustand/shallow';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDataStore, { IDataStore } from '../../../../hooks/useDataStore';

import ProfileForm from '../../../../components/Forms/ProfileForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
  },
});

function EditProfileScreen() {
  const [profileData, user] = useDataStore(
    (state: IDataStore) => [state.profile, state.user],
    shallow,
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
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
