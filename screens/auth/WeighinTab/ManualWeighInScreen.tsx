import React from 'react';
import { StyleSheet } from 'react-native';
import { Headline } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { AuthStackScreenProps } from '../../../types/navigation';
import { MANUAL_WEIGHIN } from '../../../types/enums';
import ManualWeighInForm from '../../../components/Forms/ManualWeighInForm';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    paddingVertical: 20,
  },
});

export default function ManualWeighInScreen({ route }: AuthStackScreenProps<'ManualWeighIn'>) {
  const {
    screenType, currentWeighIn, uid, planId, historyId, isImperialUnits,
  } = route.params;

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[styles.container]}
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="handled"
    >
      <Headline style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
        {screenType === MANUAL_WEIGHIN.EDIT ? 'Edit Weigh-in' : 'Input Weigh-in'}
      </Headline>
      <ManualWeighInForm
        initialValue={currentWeighIn}
        uid={uid}
        planId={planId}
        historyId={historyId}
        isImperialUnits={isImperialUnits}
      />
    </KeyboardAwareScrollView>
  );
}
