import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import PlanForm from '../../components/Forms/PlanForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
  },
});

function CreatePlanScreen() {
  const [user, plan, profile] = useDataStore(
    (state: IDataStore) => [state.user, state.plan, state.profile],
    shallow,
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      {user && (!plan || !plan.active) && profile ? (
        <PlanForm uid={user.uid} profile={profile} />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default CreatePlanScreen;
