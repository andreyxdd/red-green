import React, { Dispatch, SetStateAction } from 'react';
import { Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RBSheet from 'react-native-raw-bottom-sheet';

export interface DatePickerModal {
  id: string;
  value: Date;
  onChange?: any;
  setValue?: Dispatch<SetStateAction<Date | undefined>> | ((dob: Date) => void);
  handleClose?: () => void;
}

const DatePickerModal = React.forwardRef<RBSheet, DatePickerModal>((
  {
    value, setValue, id, handleClose, onChange,
  },
  ref,
) => {
  const onChangeDate = (_event: unknown, selectedDate?: Date) => {
    if (selectedDate && setValue) setValue(selectedDate);
  };

  return (
    <RBSheet
      ref={ref}
      onClose={handleClose}
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
        testID={id}
        value={value || new Date()}
        mode="date"
        onChange={onChange || onChangeDate}
        style={{ width: Dimensions.get('window').width * 0.9 }}
        display="spinner"
      />
      )
    </RBSheet>
  );
});

export default DatePickerModal;
