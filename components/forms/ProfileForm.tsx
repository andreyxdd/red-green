/* eslint-disable no-param-reassign */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  TextInput, Button, HelperText, Switch, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { subYears } from 'date-fns';
import produce from 'immer';

import Datepicker from '../Pickers/Datepickers/Datepicker';
import { IProfileData } from '../../types/data';
// import parseStringNumbers from '../../utils/parseStringNumbers';
// import { writeProfileData } from '../../firebase/writes';
import { UNITS } from '../../types/enums';
import Toggle from '../Toggle';
// import {
//  CMtoFT, FTtoCM, KGtoLBS, LBStoKG,
// } from '../../utils/calculate';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { REGEX, ERROR_MESSAGES, CONSTANTS } from './index';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row', width: '90%', alignSelf: 'center', marginVertical: 2,
  },
  input: { marginVertical: 2, width: '90%', alignSelf: 'center' },
  rowInput: { flex: 1 },
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

const schema = yup.object().shape({
  name: yup
    .string()
    .min(CONSTANTS.NAME.MIN_LENGTH, ERROR_MESSAGES.NAME_LENGTH)
    .max(CONSTANTS.NAME.MAX_LENGTH, ERROR_MESSAGES.NAME_LENGTH)
    .default('')
    .matches(REGEX.NAME, ERROR_MESSAGES.NAME)
    .required(ERROR_MESSAGES.REQUIRED),
  dob: yup
    .date()
    .default(subYears(new Date(), CONSTANTS.AGE.MIN))
    .required(ERROR_MESSAGES.REQUIRED),
  units: yup
    .mixed<UNITS>()
    .oneOf(Object.values(UNITS))
    .default(UNITS.METRIC)
    .required(ERROR_MESSAGES.REQUIRED),
  heightOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.METRIC,
      then: (s) => s
        .min(CONSTANTS.HEIGHT.METRIC.CM.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.CM)
        .max(CONSTANTS.HEIGHT.METRIC.CM.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.CM),
      otherwise: (s) => s
        .min(CONSTANTS.HEIGHT.IMPERIAL.FT.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.FT)
        .max(CONSTANTS.HEIGHT.IMPERIAL.FT.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.FT),
    })
    .default(CONSTANTS.HEIGHT.METRIC.CM.DEF),
  heightTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.METRIC,
      then: (s) => s
        .min(CONSTANTS.HEIGHT.METRIC.MM.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.MM)
        .max(CONSTANTS.HEIGHT.METRIC.MM.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.MM),
      otherwise: (s) => s
        .min(CONSTANTS.HEIGHT.IMPERIAL.IN.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.IN)
        .max(CONSTANTS.HEIGHT.IMPERIAL.IN.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.IN),
    })
    .default(CONSTANTS.HEIGHT.METRIC.MM.DEF),
  weightOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.METRIC,
      then: (s) => s
        .min(CONSTANTS.WEIGHT.KG.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG)
        .max(CONSTANTS.WEIGHT.KG.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG),
      otherwise: (s) => s
        .min(CONSTANTS.WEIGHT.LBS.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS)
        .max(CONSTANTS.WEIGHT.LBS.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS),
    })
    .default(CONSTANTS.WEIGHT.KG.DEF),
  weightTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .min(CONSTANTS.WEIGHT.FRACTION.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .max(CONSTANTS.WEIGHT.FRACTION.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .when('units', {
      is: (val: UNITS) => val === UNITS.METRIC,
      then: (s) => s.default(CONSTANTS.WEIGHT.FRACTION.DEF.LBS),
      otherwise: (s) => s.default(CONSTANTS.WEIGHT.FRACTION.DEF.KG),
    }),
});

export type IProfileForm = {
  initialValues?: IProfileData;
  uid: string;
}

interface FormData extends IProfileData {
  name: string;
  dob: Date;
  units: UNITS;
  heightOne: number;
  heightTwo: number;
  weightOne: number;
  weightTwo: number;
  termsAccepted: boolean;
}

function ProfileForm({ initialValues, uid }: IProfileForm) {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit, formState: { errors, isValid, isDirty }, watch,
  } = useForm<FormData>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault(),
    // defaultValues: { ...initialValues, termsAccepted: false } || {},
  });
  const imperialUnitsWatcher = watch('units') === UNITS.IMPERIAL;

  // -- handling height units conversion
  const [imperialHeight, setImperialHeight] = React.useState({
    ft: CONSTANTS.HEIGHT.IMPERIAL.FT.DEF,
    in: CONSTANTS.HEIGHT.IMPERIAL.IN.DEF,
  });
  const [metricHeight, setMetricHeight] = React.useState({
    cm: CONSTANTS.HEIGHT.METRIC.CM.DEF,
    mm: CONSTANTS.HEIGHT.METRIC.MM.DEF,
  });
  // --

  // -- handling height units conversion
  const [imperialWeight, setImperialWeight] = React.useState({
    lbs: CONSTANTS.WEIGHT.LBS.DEF,
    fraction: CONSTANTS.WEIGHT.FRACTION.DEF.LBS,
  });
  const [metricWeight, setMetricWeight] = React.useState({
    kg: CONSTANTS.WEIGHT.KG.DEF,
    fraction: CONSTANTS.WEIGHT.FRACTION.DEF.KG,
  });
  // --

  const onSubmit = (data: FormData) => {
    if (isValid) {
      console.log(data, uid);
    }
  };

  return (
    <View style={styles.container}>

      {/* Name Input */}
      <Controller
        control={control}
        name="name"
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

      {/* Date of Birth Picker */}
      <Controller
        control={control}
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
              maxDate={subYears(new Date(), CONSTANTS.AGE.MIN)}
              minDate={subYears(new Date(), CONSTANTS.AGE.MAX)}
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

      {/* Units Toggle */}
      <Controller
        control={control}
        name="units"
        render={({ field: { onChange, value } }) => (
          <Toggle
            selection={value}
            options={{
              first: { field: UNITS.METRIC, text: 'Metric (cm/mm, kg)' },
              second: { field: UNITS.IMPERIAL, text: 'Imperial (ft/in, lbs)' },
            }}
            setSelection={onChange}
            style={{ marginBottom: 14, width: '90%', alignSelf: 'center' }}
          />
        )}
      />

      {/* Height Pickers */}
      <View style={styles.rowContainer}>
        <Controller
          control={control}
          name="heightOne"
          // defaultValue={150}
          render={({ field: { onChange, onBlur } }) => (
            <View style={[styles.rowInput, { marginRight: 6 }]}>
              {imperialUnitsWatcher ? (
                <Measurepicker
                  value={imperialHeight.ft}
                  label="Height, ft"
                  error={!!errors.heightOne}
                  handleBlur={onBlur}
                  handleChange={(v) => {
                    setMetricHeight(produce((h) => {
                      const cmANDmm = v * 30.48 + imperialHeight.in * 2.54;
                      h.cm = Math.floor(cmANDmm);
                      h.mm = Number(
                        (`${Math.round(((cmANDmm - h.cm) + Number.EPSILON) * 10) / 10}`)
                          .split('.')[1],
                      );
                    }));
                    setImperialHeight(produce((h) => { h.ft = v; }));
                    onChange(v);
                  }}
                  min={CONSTANTS.HEIGHT.IMPERIAL.FT.MIN}
                  max={CONSTANTS.HEIGHT.IMPERIAL.FT.MAX}
                />
              )
                : (
                  <Measurepicker
                    value={metricHeight.cm}
                    label="Height, cm"
                    error={!!errors.heightOne}
                    handleBlur={onBlur}
                    handleChange={(v) => {
                      setMetricHeight(produce((h) => { h.cm = v; }));
                      setImperialHeight(produce((h) => {
                        const totalMM = v * 10 + metricHeight.mm;
                        const totalIN = totalMM / 25.4;
                        h.ft = Math.floor(totalIN / 12);
                        h.in = Math.round(totalIN - h.ft * 12);
                      }));
                      onChange(v);
                    }}
                    min={CONSTANTS.HEIGHT.METRIC.CM.MIN}
                    max={CONSTANTS.HEIGHT.METRIC.CM.MAX}
                  />
                )}
              <HelperText
                type="error"
              >
                {errors.heightOne?.message}
              </HelperText>
            </View>
          )}
        />
        <Controller
          control={control}
          name="heightTwo"
          render={({ field: { onChange, onBlur } }) => (
            <View style={[styles.rowInput, { marginLeft: 6 }]}>
              {imperialUnitsWatcher ? (
                <Measurepicker
                  value={imperialHeight.in}
                  label="Height, in"
                  error={!!errors.heightTwo}
                  handleBlur={onBlur}
                  handleChange={(v) => {
                    setMetricHeight(produce((h) => {
                      const cmANDmm = imperialHeight.ft * 30.48 + v * 2.54;
                      h.cm = Math.floor(cmANDmm);
                      h.mm = Number(
                        (`${Math.round(((cmANDmm - h.cm) + Number.EPSILON) * 10) / 10}`)
                          .split('.')[1],
                      );
                    }));
                    setImperialHeight(produce((h) => { h.in = v; }));
                    onChange(v);
                  }}
                  min={CONSTANTS.HEIGHT.IMPERIAL.IN.MIN}
                  max={CONSTANTS.HEIGHT.IMPERIAL.IN.MAX}
                />
              )
                : (
                  <Measurepicker
                    value={metricHeight.mm}
                    label="Height, mm"
                    error={!!errors.heightTwo}
                    handleBlur={onBlur}
                    handleChange={(v) => {
                      setMetricHeight(produce((h) => { h.mm = v; }));
                      setImperialHeight(produce((h) => {
                        const totalMM = metricHeight.cm * 10 + v;
                        const totalIN = totalMM / 25.4;
                        h.ft = Math.floor(totalIN / 12);
                        h.in = Math.round(totalIN - h.ft * 12);
                      }));
                      onChange(v);
                    }}
                    min={CONSTANTS.HEIGHT.METRIC.MM.MIN}
                    max={CONSTANTS.HEIGHT.METRIC.MM.MAX}
                  />
                )}
              <HelperText type="error">
                {errors.heightTwo?.message}
              </HelperText>
            </View>
          )}
        />
      </View>

      {/* Weight Pickers */}
      <View style={styles.rowContainer}>
        <Controller
          control={control}
          name="weightOne"
          render={({ field: { onChange, onBlur } }) => (
            <View style={[styles.rowInput, { marginRight: 6 }]}>
              {imperialUnitsWatcher ? (
                <Measurepicker
                  value={imperialWeight.lbs}
                  label="Weight, lbs"
                  error={!!errors.weightOne}
                  handleBlur={onBlur}
                  handleChange={(v) => {
                    setMetricWeight(produce((h) => {
                      const totalKG = (v + imperialWeight.fraction / 10) / 2.205;
                      h.kg = Math.floor(totalKG);
                      h.fraction = Number(
                        (`${Math.round(((totalKG - h.kg) + Number.EPSILON) * 10) / 10}`)
                          .split('.')[1],
                      );
                    }));
                    setImperialWeight(produce((h) => { h.lbs = v; }));
                    onChange(v);
                  }}
                  min={CONSTANTS.WEIGHT.LBS.MIN}
                  max={CONSTANTS.WEIGHT.LBS.MAX}
                />
              )
                : (
                  <Measurepicker
                    value={metricWeight.kg}
                    label="Weight, kg"
                    error={!!errors.weightOne}
                    handleBlur={onBlur}
                    handleChange={(v) => {
                      setMetricWeight(produce((h) => { h.kg = v; }));
                      setImperialWeight(produce((h) => {
                        const totalLBS = (v + metricWeight.fraction / 10) * 2.205;
                        h.lbs = Math.floor(totalLBS);
                        h.fraction = Number(
                          (`${Math.round(((totalLBS - h.lbs) + Number.EPSILON) * 10) / 10}`)
                            .split('.')[1],
                        );
                      }));
                      onChange(v);
                    }}
                    min={CONSTANTS.WEIGHT.KG.MIN}
                    max={CONSTANTS.WEIGHT.KG.MAX}
                  />
                )}
              <HelperText type="error">
                {errors.weightOne?.message}
              </HelperText>
            </View>
          )}
        />
        <Controller
          control={control}
          name="weightTwo"
          render={({ field: { onChange, onBlur } }) => (
            <View style={[styles.rowInput, { marginLeft: 6 }]}>
              {imperialUnitsWatcher ? (
                <Measurepicker
                  value={imperialWeight.fraction}
                  label="Weight, decimal"
                  error={!!errors.weightTwo}
                  handleBlur={onBlur}
                  handleChange={(v) => {
                    setMetricWeight(produce((h) => {
                      const totalKG = (v / 10 + imperialWeight.lbs) / 2.205;
                      h.kg = Math.floor(totalKG);
                      h.fraction = Number(
                        (`${Math.round(((totalKG - h.kg) + Number.EPSILON) * 10) / 10}`)
                          .split('.')[1],
                      );
                    }));
                    setImperialWeight(produce((h) => { h.fraction = v; }));
                    onChange(v);
                  }}
                  min={CONSTANTS.WEIGHT.FRACTION.MIN}
                  max={CONSTANTS.WEIGHT.FRACTION.MAX}
                />
              )
                : (
                  <Measurepicker
                    value={metricWeight.fraction}
                    label="Weight, decimal"
                    error={!!errors.weightTwo}
                    handleBlur={onBlur}
                    handleChange={(v) => {
                      setMetricWeight(produce((h) => { h.fraction = v; }));
                      setImperialWeight(produce((h) => {
                        const totalLBS = (v / 10 + metricWeight.kg) * 2.205;
                        h.lbs = Math.floor(totalLBS);
                        h.fraction = Number(
                          (`${Math.round(((totalLBS - h.lbs) + Number.EPSILON) * 10) / 10}`)
                            .split('.')[1],
                        );
                      }));
                      onChange(v);
                    }}
                    min={CONSTANTS.WEIGHT.FRACTION.MIN}
                    max={CONSTANTS.WEIGHT.FRACTION.MAX}
                  />
                )}
              <HelperText type="error">
                {errors.weightTwo?.message}
              </HelperText>
            </View>
          )}
        />
      </View>

      {/* Terms Acception Switch */}
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
