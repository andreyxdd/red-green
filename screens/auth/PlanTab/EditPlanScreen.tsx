import React from 'react';
import {
  Platform, StyleSheet, Button, Keyboard,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

import { differenceInDays } from 'date-fns';
import { Text, View } from '../../../components/Themed';
import DatePickerModal from '../../../components/DatePickerModal';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
// import { updateUserPlan } from '../../../firebase/updates';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EditPlanScreen() {
  const plan = useDataStore((state: IDataStore) => state.plan);
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
      plan && date
      && differenceInDays(date, new Date()) > 1
      && differenceInDays(date, plan.startDate)
    ) {
      // updateUserPlan(uid, plan.id, date);
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
    </View>
  );
}
