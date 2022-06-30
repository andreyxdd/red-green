import React from 'react';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';

interface IDatepickerIOS {
  id: string;
  value: Date;
  onChange: ((dob: Date) => void);
}

const DatepickerIOS = React.forwardRef<RBSheet, IDatepickerIOS>(({ value, id, onChange }, ref) => (
  <RBSheet
    ref={ref}
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
      onChange={(_e:unknown, d?:Date) => { if (d) onChange(d); }}
      style={{ width: Dimensions.get('window').width * 0.9 }}
      display="spinner"
    />
  </RBSheet>
));

export default DatepickerIOS;
