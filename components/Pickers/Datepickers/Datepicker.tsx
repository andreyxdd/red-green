import React from 'react';
import { Dimensions, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DateInput, IDatepicker } from './index';

function DatepickerAndroid({
  value, id, label, onChange, style, error, dateFormat, maxDate, minDate,
}: IDatepicker) {
  const [showAndroidDatePicker, setShowAndroidDatePicker] = React.useState(false);
  const toggleDatepicker = () => {
    Keyboard.dismiss();
    setShowAndroidDatePicker(true);
  };

  return (
    <>
      <DateInput
        label={label}
        style={style}
        value={value}
        dateFormat={dateFormat}
        error={error}
        handleToggle={toggleDatepicker}
      />
      {showAndroidDatePicker ? (
        <DateTimePicker
          testID={id}
          value={value}
          mode="date"
          onChange={(_e: unknown, d?: Date) => {
            setShowAndroidDatePicker(false);
            if (d) onChange(d);
          }}
          style={{ width: Dimensions.get('window').width * 0.9 }}
          // display="spinner"
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      ) : null}
    </>
  );
}

export default DatepickerAndroid;
