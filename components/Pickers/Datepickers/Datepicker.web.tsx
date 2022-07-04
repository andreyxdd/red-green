import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { View } from 'react-native';
import { DateInput, IDatepicker } from './index';

function DatepickerWeb({
  value, label, onChange, style, error, dateFormat, maxDate, minDate,
}: IDatepicker) {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      customInput={(
        <View style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
          <DateInput
            label={label}
            style={style}
            value={value}
            dateFormat={dateFormat}
            error={error}
          />
        </View>
      )}
      maxDate={maxDate}
      minDate={minDate}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  );
}

export default DatepickerWeb;
