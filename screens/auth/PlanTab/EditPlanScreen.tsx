import React from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import PlanForm from '../../../components/Forms/PlanForm';
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
  const user = useDataStore((state: IDataStore) => state.user);
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      {user ? (
        <PlanForm
          initialValues={{
            planType: plan.type,
            goalWeight: plan.goalWeight,
            goalDate: plan.goalDate,
          }}
          uid={user.uid}
        />
      ) : null}
    </KeyboardAwareScrollView>
  );
}

export default EditPlanScreen;
