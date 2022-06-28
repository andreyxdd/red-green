import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Keyboard, Platform,
} from 'react-native';
import {
  TextInput, Button, HelperText,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { PLANS } from '../../types/enums';
import { AuthStackScreenProps } from '../../types/navigation';
import DatePickerModal from '../../components/DatePickerModal';
import { dimensions } from '../../styles/base';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import { writeMaintenancePlan } from '../../firebase/firebase';

interface FormData {
  type?: PLANS;
  endDate: Date;
  startWeight?: number;
  goalWeight: number;
}

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginHorizontal: 30 },
  input: { marginVertical: 5 },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
});

export default function CreatePlanScreen({ navigation }: AuthStackScreenProps<'CreatePlan'>) {
  const uid = useDataStore((state: IDataStore) => state.uid);

  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    mode: 'onChange',
  });

  const datePickerRef = React.useRef<RBSheet>(null);
  const [showAndroidDatePicker, setShowAndroidDatePicker] = React.useState(false);
  const toggleDatePicker = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      setShowAndroidDatePicker(true);
    } else if (datePickerRef.current) datePickerRef.current.open();
  };

  const onSubmit = (data: FormData) => {
    if (uid) {
      writeMaintenancePlan(uid, data.endDate, data.goalWeight as number);
      navigation.goBack(); // pass props to show if it's the very first weigh-in for the plan
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        name="endDate"
        defaultValue={new Date()}
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            {Platform.OS === 'ios' && (
              <DatePickerModal
                ref={datePickerRef}
                value={value}
                onChange={(_e: unknown, d?: Date) => {
                  onChange(d);
                }}
                id="endDatePicker"
              />
            )}
            {Platform.OS === 'android' && showAndroidDatePicker && (
              <DateTimePicker
                testID="endDatePicker"
                value={value || new Date()}
                mode="date"
                onChange={(_e: unknown, d?: Date) => {
                  setShowAndroidDatePicker(false);
                  onChange(d);
                }}
                style={{ width: dimensions.fullWidth * 0.8, height: '85%' }}
                display="spinner"
              />
            )}
            <TouchableOpacity onPress={toggleDatePicker}>
              <View pointerEvents="none">
                <TextInput
                  label="Goal Date"
                  style={styles.input}
                  value={value && format(value, 'yyyy-MM-dd')}
                  error={errors.endDate && true}
                />
              </View>
            </TouchableOpacity>
            <HelperText type="error">{errors.endDate?.message}</HelperText>
          </>
        )}
      />
      {/* <Controller
        control={control}
        name="units"
        defaultValue={UNITS.METRIC}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
         render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value}
              label="Email"
              style={styles.input}
              onBlur={onBlur}
              textContentType="emailAddress"
              autoCapitalize="none"
              onChangeText={(v) => onChange(v)}
              error={errors.email && true}
            />
            <HelperText type="error">{errors.email?.message}</HelperText>
          </>
        )}
      /> */}
      <Controller
        control={control}
        name="goalWeight"
        defaultValue={0.0}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value.toString()}
              label="Goal Weight"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              error={errors.goalWeight && true}
              keyboardType="numeric"
              returnKeyType="done"
              selectTextOnFocus
            />
            <HelperText type="error">{errors.goalWeight?.message}</HelperText>
          </>
        )}
      />
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        Submit
      </Button>
    </KeyboardAwareScrollView>
  );
}
