import React from 'react';
import { Dimensions, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { DateInput, IDatepicker } from './index';

function DatepickerIOS({
  value, id, label, onChange, style, error, dateFormat, maxDate, minDate,
}: IDatepicker) {
  const datePickerRef = React.useRef<RBSheet>(null);
  const toggleDatepicker = () => {
    Keyboard.dismiss();
    if (datePickerRef.current) {
      datePickerRef.current.open();
    }
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
      <RBSheet
        ref={datePickerRef}
        height={300}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <DateTimePicker
          testID={id}
          value={value}
          mode="date"
          onChange={(_e: unknown, d?: Date) => {
            if (d) onChange(d);
          }}
          style={{ width: Dimensions.get('window').width * 0.9 }}
          display="spinner"
          maximumDate={maxDate}
          minimumDate={minDate}
        />
      </RBSheet>
    </>
  );
}

export default DatepickerIOS;
