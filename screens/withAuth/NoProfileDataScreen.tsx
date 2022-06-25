import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard, Platform,
} from 'react-native';
import {
  TextInput, Button, Switch, HelperText,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import RBSheet from 'react-native-raw-bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { IProfileData } from '../../types';
import DatePickerModal from '../../components/DatePickerModal';
import { dimensions } from '../../styles/base';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import { writeProfileData } from '../../firebase';

interface FormData extends IProfileData {
  termsAccepted: boolean;
}

const REGEX = {
  personalName: /^[a-z ,.'-]+$/i,
};

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

export default function NoProfileDataScreen() {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { termsAccepted, ...profileData } = data;
    if (uid) writeProfileData(uid, profileData);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Controller
        control={control}
        defaultValue=""
        name="name"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          pattern: { message: ERROR_MESSAGES.NAME, value: REGEX.personalName },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              label="Name"
              style={styles.input}
              value={value}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              error={errors.name && true}
            />
            <HelperText
              visible={!errors.name}
              type="error"
            >
              {errors.name?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="dob"
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
                onChange={(v: any) => {
                  onChange(v);
                }}
                id="dobPicker"
              />
            )}
            {Platform.OS === 'android' && showAndroidDatePicker && (
              <DateTimePicker
                testID="dobPicker"
                value={value || new Date()}
                mode="date"
                onChange={(_e: any, d?: Date) => {
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
                  label="Birthdate"
                  style={styles.input}
                  value={value && format(value, 'yyyy-MM-dd')}
                  error={errors.dob && true}
                />
              </View>
            </TouchableOpacity>
            <HelperText type="error">{errors.dob?.message}</HelperText>
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
        name="height"
        defaultValue={0.0}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value.toString()}
              label="Height"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              error={errors.height && true}
              keyboardType="numeric"
              returnKeyType="done"
              selectTextOnFocus
            />
            <HelperText type="error">{errors.height?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="weight"
        defaultValue={0.0}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              value={value.toString()}
              label="Weight"
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              error={errors.weight && true}
              keyboardType="numeric"
              returnKeyType="done"
              selectTextOnFocus
            />
            <HelperText type="error">{errors.weight?.message}</HelperText>
          </>
        )}
      />
      <View style={styles.row}>
        <Text>Terms Accept</Text>
        <Controller
          control={control}
          defaultValue={false}
          name="termsAccepted"
          rules={{ required: { value: true, message: ERROR_MESSAGES.TERMS } }}
          render={({ field: { onChange, value } }) => (
            <Switch
              value={value}
              onValueChange={(v) => onChange(v)}
            />
          )}
        />
      </View>
      <HelperText type="error">{errors.termsAccepted?.message}</HelperText>
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
