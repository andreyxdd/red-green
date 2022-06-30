import React from 'react';
import {
  StyleSheet, View, Alert,
} from 'react-native';
import {
  TextInput, Button, HelperText, Switch, Text, ActivityIndicator,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

// import { format } from 'date-fns';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import RBSheet from 'react-native-raw-bottom-sheet';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
import Datepicker from '../Datepicker/Datepicker';
import { IProfileData } from '../../types/data';
import parseStringNumbers from '../../utils/parseStringNumbers';
import { writeProfileData } from '../../firebase/writes';
import { UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import {
  CMtoFT, FTtoCM, KGtoLBS, LBStoKG,
} from '../../utils/calculate';

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
  const {
    control,
    handleSubmit, formState: { errors, isValid, isDirty }, watch, setValue,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: { ...initialValues, termsAccepted: false } || {},
  });

  // -- watching the units
  const imperialUnitsWatcher = watch('units') === UNITS.IMPERIAL;
  const weightWatcher = watch('weight');
  const heightWatcher = watch('height');
  const [unitsLoading, setUnitsLoading] = React.useState(true);

  React.useEffect(() => {
    setUnitsLoading(true);
    if (heightWatcher && weightWatcher) {
      if (imperialUnitsWatcher) {
        setValue('height', CMtoFT(heightWatcher));
        setValue('weight', KGtoLBS(weightWatcher));
      } else if (initialValues) {
        setValue('height', initialValues.height);
        setValue('weight', initialValues.weight);
      } else {
        setValue('height', FTtoCM(heightWatcher));
        setValue('weight', LBStoKG(weightWatcher));
      }
    }
    setUnitsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imperialUnitsWatcher]);
  //--

  const onSubmit = ({
    name, dob, units, height, weight,
  }: FormData) => {
    if (isValid) {
      try {
        const newHeight = parseStringNumbers(height);
        const newWeight = parseStringNumbers(weight);

        const newProfileData = {
          name,
          dob,
          units,
          height: units === UNITS.IMPERIAL ? FTtoCM(newHeight) : newHeight,
          weight: units === UNITS.IMPERIAL ? LBStoKG(newWeight) : newWeight,
        };

        writeProfileData(uid, newProfileData as IProfileData);
        if (initialValues) navigation.navigate('UserMenu');
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    }
  };

  // handling datepickers
  /* const datePickerRef = React.useRef<RBSheet>(null);
  const [showAndroidDatePicker, setShowAndroidDatePicker] = React.useState(false);
  const toggleDatepicker = () => {
    Keyboard.dismiss();
    if (Platform.OS === 'android') {
      setShowAndroidDatePicker(true);
    } else if (Platform.OS === 'ios' && datePickerRef.current) {
      datePickerRef.current.open();
    }
  }; */
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
            <Datepicker
              id="profile-form-datepicker"
              label="Birthdate"
              style={styles.input}
              value={value}
              onChange={onChange}
              error={!!errors.dob}
              dateFormat="yyyy-MM-dd"
            />
            <HelperText type="error">{errors.dob?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="units"
        defaultValue={UNITS.METRIC}
        render={({ field: { onChange, value } }) => (
          <Toggle
            selection={value}
            options={{
              first: { field: UNITS.METRIC, text: 'Metric (cm, kg)' },
              second: { field: UNITS.IMPERIAL, text: 'Imperial (ft, lbs)' },
            }}
            setSelection={onChange}
            style={{ marginBottom: 14, width: '90%', alignSelf: 'center' }}
          />
        )}
      />
      <Controller
        control={control}
        name="height"
        defaultValue={initialValues ? initialValues.height : 0.0}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            {unitsLoading ? <ActivityIndicator animating size="small" />
              : (
                <TextInput
                  value={value.toString()}
                  label={`Height, ${imperialUnitsWatcher ? 'ft' : 'cm'}`}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(v)}
                  error={errors.height && true}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  selectTextOnFocus
                />
              )}
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
            {unitsLoading ? <ActivityIndicator animating size="small" />
              : (
                <TextInput
                  value={value.toString()}
                  label={`Weight, ${imperialUnitsWatcher ? 'lbs' : 'kg'}`}
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(v) => onChange(v)}
                  error={errors.weight && true}
                  keyboardType="decimal-pad"
                  returnKeyType="done"
                  selectTextOnFocus
                />
              )}
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
