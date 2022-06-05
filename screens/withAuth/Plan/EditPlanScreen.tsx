import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Platform, StyleSheet, Button, Keyboard, Dimensions,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';

// import { useTailwind } from 'tailwind-rn';
import { Text, View } from '../../../components/Themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function EditPlanScreen() {
  // const tailwind = useTailwind();
  const [date, setDate] = React.useState(new Date(1598051730000));

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

  const onChangeDate = (event: unknown, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Button onPress={toggleDatePicker} title="Show date picker!" />
      </View>
      <Text>
        selected:
        {' '}
        {date.toLocaleString()}
      </Text>
      <RBSheet
        ref={datePickerRef}
        closeOnDragDown
        height={300}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <DateTimePicker
          testID="dateTimePickerGoal"
          value={date || new Date()}
          mode="date"
          onChange={onChangeDate}
          style={{ width: Dimensions.get('window').width * 0.9 }}
          display="spinner"
        />
      </RBSheet>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
