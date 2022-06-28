import React from 'react';
import {
  StyleSheet, TouchableOpacity, Keyboard, Platform,
} from 'react-native';
import { useTailwind } from 'tailwind-rn';
import RBSheet from 'react-native-raw-bottom-sheet';
import { format } from 'date-fns';
import { Text, View } from '../Themed';
import { updateUserDOB } from '../../firebase/firebase';
import DatePickerModal from '../DatePickerModal';
import useAuthentification from '../../hooks/useAuthentification';

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

interface IDOBInput{
  DOB: Date;
}

export default function DOBInput({ DOB }: IDOBInput) {
  const tailwind = useTailwind();
  const { user } = useAuthentification();

  const [inputDOB, setInputDOB] = React.useState<Date>();

  React.useEffect(() => {
    setInputDOB(DOB);
  }, [DOB]);

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
    if (user && inputDOB) updateUserDOB(user.uid, inputDOB);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.formInput}
        onPress={toggleDatePicker}
      >
        <Text style={[tailwind('text-placeholder'), styles.titleText]}>Date of Birth</Text>
        <View style={tailwind('flex items-center flex-row')}>
          <Text style={[tailwind('text-text'), styles.inputText]}>{DOB ? format(DOB, 'dd-MM-yyyy') : null}</Text>
        </View>
      </TouchableOpacity>
      {inputDOB ? (
        <DatePickerModal
          ref={datePickerRef}
          value={inputDOB}
          setValue={setInputDOB}
          id="datePickerDOB"
          handleClose={handleClose}
        />
      ) : null}
    </>
  );
}
