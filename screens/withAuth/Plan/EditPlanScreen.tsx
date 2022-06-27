import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform, StyleSheet, Button, Keyboard,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { differenceInDays } from 'date-fns';
import shallow from 'zustand/shallow';
import { Text, View } from '../../../components/Themed';
import DatePickerModal from '../../../components/DatePickerModal';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import { updateUserPlan } from '../../../firebase/firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EditPlanScreen() {
  const [uid, plan] = useDataStore((state: IDataStore) => [state.uid, state.plan], shallow);
  const [date, setDate] = React.useState<Date>();

  const datePickerRef = React.useRef<RBSheet>(null);
  const toggleDatePicker = () => {
    Keyboard.dismiss();
    if (datePickerRef.current) {
      if (Platform.OS === 'android') {
      // setGoalDatePickerAndroid(true);
      } else {
        datePickerRef.current.open();
      }
    }
  };

  React.useEffect(() => {
    if (plan?.endDate) setDate(plan?.endDate);
  }, [plan?.endDate]);

  const handleClose = () => {
    if (
      uid && plan && date
      && differenceInDays(date, new Date()) > 1
      && differenceInDays(date, plan.startDate)
    ) {
      updateUserPlan(uid, plan.id, date);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Button onPress={toggleDatePicker} title="Show date picker!" />
      </View>
      {date ? (
        <>
          <Text>
            selected:
            {' '}
            {date.toLocaleString()}
          </Text>
          <DatePickerModal
            ref={datePickerRef}
            value={date}
            setValue={setDate}
            id="datePickerendDate"
            handleClose={handleClose}
          />
        </>
      ) : null}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
