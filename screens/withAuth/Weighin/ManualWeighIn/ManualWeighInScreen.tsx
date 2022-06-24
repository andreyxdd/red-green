import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Headline, TextInput } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import React from 'react';
import shallow from 'zustand/shallow';
import { RootStackScreenProps } from '../../../../types';
import useDataStore, { IDataStore } from '../../../../hooks/useDataStore';
import { updateUserWeight, updateUserLastHistoryItem, writeUserLastHistoryItem } from '../../../../firebase';

export default function ManualWeighInScreen({ route, navigation }: RootStackScreenProps<'ManualWeighIn'>) {
  const [uid, plan, history] = useDataStore(
    (state: IDataStore) => [state.uid, state.plan, state.history],
    shallow,
  );
  const { screenType, value } = route.params;

  const [inputWeight, setInputWeight] = React.useState<string>();

  React.useEffect(() => { if (value) setInputWeight(value.toFixed(1)); }, [value]);

  const handleSubmitEditing = () => {
    const weightInValue = inputWeight ? parseFloat(inputWeight.replaceAll(',', '.')) : NaN;

    if (uid && Number.isFinite(weightInValue) && plan && history) {
      updateUserWeight(uid, weightInValue);

      if (screenType === 'edit') {
        updateUserLastHistoryItem(uid, plan.id, history[0].id, weightInValue);
      } else {
        writeUserLastHistoryItem(uid, plan.id, weightInValue);
      }

      navigation.goBack();
    }
  };

  const handleChange = (newWeight: string) => {
    setInputWeight(newWeight);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
      <Headline>{screenType === 'edit' ? 'Edit Weigh-in' : 'Input Weigh-in'}</Headline>
      <TextInput
        label="Today's Weigh-in"
        keyboardType="numeric"
        returnKeyType="done"
        value={inputWeight}
        onChangeText={handleChange}
        onSubmitEditing={handleSubmitEditing}
        style={{ marginVertical: 12 }}
        autoComplete={Platform.OS === 'web' ? 'none' : 'off'}
      />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </KeyboardAwareScrollView>
  );
}
