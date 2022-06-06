import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform, StyleSheet, Button, Keyboard,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

// import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../../../components/Themed';
import DatePickerModal from '../../../components/DatePickerModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EditPlanScreen() {
  // const tailwind = useTailwind();
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

  return (
    <View style={styles.container}>
      <View>
        <Button onPress={toggleDatePicker} title="Show date picker!" />
      </View>
      {date && (
      <>
        <Text>
          selected:
          {' '}
          {date.toLocaleString()}
        </Text>
        <DatePickerModal ref={datePickerRef} value={date} setValue={setDate} id="datePickerGoal" />
      </>
      )}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
