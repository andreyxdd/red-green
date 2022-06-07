import React from 'react';
import {
  StyleSheet, TouchableOpacity, Keyboard, Platform,
} from 'react-native';
import { User } from 'firebase/auth';
import { useTailwind } from 'tailwind-rn';
import RBSheet from 'react-native-raw-bottom-sheet';
import { format } from 'date-fns';
import { Text, View } from '../Themed';
import { updateUserDOB } from '../../firebase';
import DatePickerModal from '../DatePickerModal';
import useStore, { IStore } from '../../hooks/useStore';

const styles = StyleSheet.create({
  inputText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
  },
  titleText: {
    fontWeight: '800',
    fontSize: 18,
    marginRight: 6,
  },
  formInput: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#435A71',
    zIndex: 1,
  },
});

interface IDOBInput {
  user: User;
}

export default function DOBInput({ user }: IDOBInput) {
  const tailwind = useTailwind();
  const initDOB = useStore((state: IStore) => state.dob);

  const [DOB, setDOB] = React.useState<Date>();
  React.useEffect(() => {
    setDOB(initDOB);
  }, [initDOB]);

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

  const handleClose = () => {
    if (user && DOB) updateUserDOB(user.uid, DOB);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.formInput}
        onPress={toggleDatePicker}
      >
        <Text style={[tailwind('text-placeholder'), styles.titleText]}>Date of Birth</Text>
        <View style={tailwind('flex items-center flex-row')}>
          <Text style={[tailwind('text-text'), styles.inputText]}>{DOB && format(DOB, 'dd-MM-yyyy')}</Text>
        </View>
      </TouchableOpacity>
      {DOB && (
      <DatePickerModal
        ref={datePickerRef}
        value={DOB}
        setValue={setDOB}
        id="datePickerDOB"
        handleClose={handleClose}
      />
      )}
    </>
  );
}
