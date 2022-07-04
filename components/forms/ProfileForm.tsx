import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import {
  TextInput, Button, HelperText, Switch, Text, ActivityIndicator,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { subYears } from 'date-fns';

import Datepicker from '../Pickers/Datepickers/Datepicker';
import { IProfileData } from '../../types/data';
import parseStringNumbers from '../../utils/parseStringNumbers';
import { writeProfileData } from '../../firebase/writes';
import { UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import {
  CMtoFT, FTtoCM, KGtoLBS, LBStoKG,
} from '../../utils/calculate';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { REGEX, ERROR_MESSAGES, CONSTANTS } from './index';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  button: {
    width: '80%', paddingVertical: 4, marginTop: 14, alignSelf: 'center',
  },
  helperText: { width: '90%', alignSelf: 'center' },
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
      } catch (error) {
        Alert.alert('Error', 'Something went wrong');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        defaultValue={initialValues ? initialValues.name : ''}
        name="name"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
          pattern: { message: ERROR_MESSAGES.NAME, value: REGEX.NAME },
          maxLength: { value: CONSTANTS.NAME_MIN_LENGTH, message: ERROR_MESSAGES.NAME_LENGTH },
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
              style={styles.helperText}
              type="error"
            >
              {errors.name?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        defaultValue={initialValues ? initialValues.dob : subYears(new Date(), CONSTANTS.MIN_AGE)}
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
              maxDate={subYears(new Date(), CONSTANTS.MIN_AGE)}
              minDate={subYears(new Date(), CONSTANTS.MAX_AGE)}
            />
            <HelperText
              style={styles.helperText}
              type="error"
            >
              {errors.dob?.message}
            </HelperText>
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
              second: { field: UNITS.IMPERIAL, text: 'Imperial (ft/in, lbs)' },
            }}
            setSelection={onChange}
            style={{ marginBottom: 14, width: '90%', alignSelf: 'center' }}
          />
        )}
      />
      <Controller
        control={control}
        name="height"
        defaultValue={initialValues ? initialValues.height : CONSTANTS.HEIGHT.CM.AVG}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            message: imperialUnitsWatcher ? ERROR_MESSAGES.INVALID_HEIGHT.FT
              : ERROR_MESSAGES.INVALID_HEIGHT.CM,
            value: imperialUnitsWatcher ? REGEX.HEIGHT.FT
              : REGEX.HEIGHT.CM,
          },
          validate: (v) => {
            if (imperialUnitsWatcher) {
              return (v > CONSTANTS.HEIGHT.FT.MIN && v < CONSTANTS.HEIGHT.FT.MAX)
                || ERROR_MESSAGES.INVALID_HEIGHT_RANGE.FT;
            }
            return (v > CONSTANTS.HEIGHT.CM.MIN && v < CONSTANTS.HEIGHT.CM.MAX)
              || ERROR_MESSAGES.INVALID_HEIGHT_RANGE.CM;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          if (unitsLoading) return <ActivityIndicator animating size="small" />;
          return (
            <>
              <Measurepicker
                value={value}
                label={`Height, ${imperialUnitsWatcher ? 'ft/in' : 'cm'}`}
                style={styles.input}
                error={!!errors.height}
                handleBlur={onBlur}
                handleChange={onChange}
                numOfWholePartOptions={imperialUnitsWatcher
                  ? CONSTANTS.HEIGHT.FT.MAX - CONSTANTS.HEIGHT.FT.MIN
                  : CONSTANTS.HEIGHT.CM.MAX - CONSTANTS.HEIGHT.CM.MIN}
                wholeMinValue={imperialUnitsWatcher
                  ? CONSTANTS.HEIGHT.FT.MIN
                  : CONSTANTS.HEIGHT.CM.MIN}
                numOfDecimalOptions={imperialUnitsWatcher
                  ? CONSTANTS.HEIGHT.FT.IN
                  : undefined}
              />
              <HelperText
                style={styles.helperText}
                type="error"
              >
                {errors.height?.message}
              </HelperText>
            </>
          );
        }}
      />
      <Controller
        control={control}
        name="weight"
        defaultValue={initialValues ? initialValues.weight : CONSTANTS.WEIGHT.KG.AVG}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            message: imperialUnitsWatcher
              ? ERROR_MESSAGES.INVALID_WEIGHT.LBS
              : ERROR_MESSAGES.INVALID_WEIGHT.KG,
            value: imperialUnitsWatcher
              ? REGEX.WEIGHT.LBS
              : REGEX.WEIGHT.KG,
          },
          validate: (v) => {
            if (imperialUnitsWatcher) {
              return (v > CONSTANTS.WEIGHT.LBS.MIN && v < CONSTANTS.WEIGHT.LBS.MAX)
                || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS;
            }
            return (v > CONSTANTS.WEIGHT.KG.MIN && v < CONSTANTS.WEIGHT.KG.MAX)
              || ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG;
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => {
          if (unitsLoading) return <ActivityIndicator animating size="small" />;
          return (
            <>
              <Measurepicker
                value={value}
                label={`Weight, ${imperialUnitsWatcher ? 'lbs' : 'kg'}`}
                style={styles.input}
                error={!!errors.weight}
                handleBlur={onBlur}
                handleChange={onChange}
                numOfWholePartOptions={imperialUnitsWatcher
                  ? CONSTANTS.WEIGHT.LBS.MAX - CONSTANTS.WEIGHT.LBS.MIN
                  : CONSTANTS.WEIGHT.KG.MAX - CONSTANTS.WEIGHT.KG.MIN}
                wholeMinValue={imperialUnitsWatcher
                  ? CONSTANTS.WEIGHT.LBS.MIN
                  : CONSTANTS.WEIGHT.KG.MIN}
                numOfDecimalOptions={imperialUnitsWatcher
                  ? undefined
                  : CONSTANTS.WEIGHT.KG.DECIMAL}
              />
              <HelperText
                style={styles.helperText}
                type="error"
              >
                {errors.weight?.message}
              </HelperText>
            </>
          );
        }}
      />
      {!initialValues ? (
        <>
          <View style={styles.row}>
            <Text style={{ marginHorizontal: 4 }}>Accept</Text>
            <Text
              style={{ color: '#33A1FF', paddingLeft: 4, paddingRight: 10 }}
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
          <HelperText type="error" style={{ textAlign: 'center' }}>
            {errors.termsAccepted?.message}
          </HelperText>
        </>
      ) : null}
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
