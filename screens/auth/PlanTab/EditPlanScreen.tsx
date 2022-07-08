import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import { PlanForm } from '../../../components/Forms';
import { AuthStackScreenProps } from '../../../types/navigation';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
  },
});

function EditPlanScreen({ route }: AuthStackScreenProps<'EditPlan'>) {
  const { plan } = route.params;
  const [user, profile] = useDataStore((state: IDataStore) => [state.user, state.profile], shallow);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      {user && profile ? (
        <PlanForm
          initialValues={{
            plan: plan.type,
            goalWeightOne: plan.goalWeight.kg,
            goalWeightTwo: plan.goalWeight.kgFraction,
            goalDate: plan.goalDate,
          }}
          profile={profile}
          uid={user.uid}
        />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default EditPlanScreen;
