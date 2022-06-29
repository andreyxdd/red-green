import React from 'react';
import {
  StyleSheet, View, Pressable, Alert,
} from 'react-native';
import {
  TextInput, Button, HelperText, Switch, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';

import { format } from 'date-fns';
import { DatePickerModal } from 'react-native-paper-dates';
import { useNavigation } from '@react-navigation/native';
import { IProfileData } from '../../types/data';
import parseStringNumbers from '../../utils/parseStringNumbers';
import { writeProfileData } from '../../firebase/writes';

const REGEX = {
  personalName: /^[a-z ,.'-]+$/i,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginBottom: 14, alignSelf: 'center',
  },
  row: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
});

export type IProfileForm = {
  initialValues?: IProfileData;
  uid: string;
}

interface FormData extends IProfileData {
  termsAccepted: boolean;
}

function ProfileForm({ initialValues, uid }: IProfileForm) {
  const navigation = useNavigation();
  const { control, handleSubmit, formState: { errors, isValid, isDirty } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { ...initialValues, termsAccepted: false } || {},
  });

  const onSubmit = ({
    name, dob, height, weight,
  }: FormData) => {
    if (isValid) {
      try {
        const newHeight = parseStringNumbers(height);
        const newWeight = parseStringNumbers(weight);

        const newProfileData = {
          name,
          dob,
          height: newHeight,
          weight: newWeight,
        };

        writeProfileData(uid, newProfileData as IProfileData);
        if (initialValues) navigation.navigate('UserMenu');
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    }
  };

  // handling datepickers
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  //--

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue={initialValues ? initialValues.name : ''}
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
              returnKeyType="done"
              selectTextOnFocus
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
        defaultValue={initialValues ? initialValues.dob : new Date()}
        name="dob"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <DatePickerModal
              locale="en"
              mode="single"
              date={value}
              visible={showDatePicker}
              onDismiss={() => { setShowDatePicker(false); }}
              onConfirm={() => { setShowDatePicker(false); }}
              onChange={({ date }) => { setShowDatePicker(false); onChange(date); }}
            />
            <Pressable onPress={() => { setShowDatePicker(true); }}>
              <View pointerEvents="none">
                <TextInput
                  label="Birthdate"
                  style={styles.input}
                  value={value && format(value, 'yyyy-MM-dd')}
                  error={errors.dob && true}
                />
              </View>
            </Pressable>
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
        defaultValue={initialValues ? initialValues.height : 0.0}
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
        defaultValue={initialValues ? initialValues.weight : 0.0}
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
      {!initialValues ? (
        <View style={styles.row}>
          <Text style={{ marginHorizontal: 4 }}>Accept</Text>
          <Text
            style={{ color: '#33A1FF', paddingRight: 10 }}
            onPress={() => { navigation.navigate('ReadTerms'); }}
          >
            terms and conditions
          </Text>
          <Controller
            control={control}
            defaultValue={false}
            name="termsAccepted"
            rules={{ required: { value: true, message: ERROR_MESSAGES.TERMS } }}
            render={({ field: { onChange, value } }) => (
              <Switch
                style={{ marginLeft: 10 }}
                value={value}
                onValueChange={(v) => onChange(v)}
              />
            )}
          />
        </View>
      ) : null}
      <HelperText type="error">{errors.termsAccepted?.message}</HelperText>
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.button}
        disabled={!isValid || !isDirty}
      >
        Submit
      </Button>
    </View>
  );
}

export default ProfileForm;
