/* eslint-disable no-param-reassign */
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
  TextInput, Button, HelperText, Switch, Text,
} from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { subYears } from 'date-fns';
import produce from 'immer';

import {
  CMandMMtoFTandIN, FTandINtoCMandMM, KGtoLBS, LBStoKG,
} from '../../utils/conversions';
import Datepicker from '../Pickers/Datepickers/Datepicker';
import { IProfile } from '../../types/data';
import { writeProfileData } from '../../firebase/writes';
import { UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import { REGEX, ERROR_MESSAGES, CONSTANTS } from './settings';

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

const YUPschema = yup.object().shape({
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
    .default(UNITS.METRIC),
  heightOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.IMPERIAL,
      then: (s) => s
        .min(CONSTANTS.HEIGHT.IMPERIAL.FT.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.FT)
        .max(CONSTANTS.HEIGHT.IMPERIAL.FT.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.FT)
        .default(CONSTANTS.HEIGHT.IMPERIAL.FT.DEF),
      otherwise: (s) => s
        .min(CONSTANTS.HEIGHT.METRIC.CM.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.CM)
        .max(CONSTANTS.HEIGHT.METRIC.CM.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.CM)
        .default(CONSTANTS.HEIGHT.METRIC.CM.DEF),
    }),
  heightTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.IMPERIAL,
      then: (s) => s
        .min(CONSTANTS.HEIGHT.IMPERIAL.IN.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.IN)
        .max(CONSTANTS.HEIGHT.IMPERIAL.IN.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.IMPERIAL.IN)
        .default(CONSTANTS.HEIGHT.IMPERIAL.IN.DEF),
      otherwise: (s) => s
        .min(CONSTANTS.HEIGHT.METRIC.MM.MIN, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.MM)
        .max(CONSTANTS.HEIGHT.METRIC.MM.MAX, ERROR_MESSAGES.INVALID_HEIGHT_RANGE.METRIC.MM)
        .default(CONSTANTS.HEIGHT.METRIC.MM.DEF),
    }),
  weightOne: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .when('units', {
      is: (val: UNITS) => val === UNITS.IMPERIAL,
      then: (s) => s
        .min(CONSTANTS.WEIGHT.LBS.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS)
        .max(CONSTANTS.WEIGHT.LBS.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.LBS)
        .default(CONSTANTS.WEIGHT.LBS.DEF),
      otherwise: (s) => s
        .min(CONSTANTS.WEIGHT.KG.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG)
        .max(CONSTANTS.WEIGHT.KG.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.KG)
        .default(CONSTANTS.WEIGHT.KG.DEF),
    }),
  weightTwo: yup
    .number()
    .typeError(ERROR_MESSAGES.NONNUMBER)
    .required(ERROR_MESSAGES.REQUIRED)
    .min(CONSTANTS.WEIGHT.FRACTION.MIN, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .max(CONSTANTS.WEIGHT.FRACTION.MAX, ERROR_MESSAGES.INVALID_WEIGHT_RANGE.FRACTION)
    .when('units', {
      is: (val: UNITS) => val === UNITS.IMPERIAL,
      then: (s) => s.default(CONSTANTS.WEIGHT.FRACTION.DEF.KG),
      otherwise: (s) => s.default(CONSTANTS.WEIGHT.FRACTION.DEF.LBS),
    }),
  termsAccepted: yup
    .boolean()
    .oneOf([true], ERROR_MESSAGES.TERMS),
});

export type IProfileForm = {
  initialValues?: IProfile;
  uid: string;
}

interface FormData extends IProfile {
  termsAccepted: boolean;
  heightOne: number;
  heightTwo: number;
  weightOne: number;
  weightTwo: number;
}

function initToDefault(init: IProfile, initialUnits: UNITS): FormData {
  if (initialUnits === UNITS.IMPERIAL) {
    const { feet, inches } = CMandMMtoFTandIN(init.height.cm, init.height.mm);
    const { lbs, lbsFraction } = KGtoLBS(init.weight.kg, init.weight.fraction);
    return {
      ...init,
      termsAccepted: true,
      heightOne: feet,
      heightTwo: inches,
      weightOne: lbs,
      weightTwo: lbsFraction,
    };
  }
  return {
    ...init,
    termsAccepted: true,
    heightOne: init.height.cm,
    heightTwo: init.height.mm,
    weightOne: init.weight.kg,
    weightTwo: init.weight.fraction,
  };
}

function ProfileForm({ initialValues, uid }: IProfileForm) {
  const navigation = useNavigation();

  const defaultFromInitial = React.useMemo(
    () => (initialValues && initToDefault(initialValues, initialValues.units)),
    [initialValues],
  );

  const {
    control,
    handleSubmit, formState: { errors, isValid, isDirty }, watch, setValue,
  } = useForm<FormData>({
    mode: 'all',
    resolver: yupResolver(YUPschema),
    defaultValues: defaultFromInitial || YUPschema.getDefault(),
  });
  const imperialUnitsWatcher = watch('units') === UNITS.IMPERIAL;
  const termAcceptedWatcher = watch('termsAccepted');

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

  // change initial values if they are passed
  React.useEffect(() => {
    if (initialValues) {
      const imperialValues = initToDefault(initialValues, UNITS.IMPERIAL);
      setImperialWeight(produce((w) => {
        w.lbs = imperialValues.weightOne;
        w.fraction = imperialValues.weightTwo;
      }));
      setImperialHeight(produce((h) => {
        h.ft = imperialValues.heightOne;
        h.in = imperialValues.heightTwo;
      }));

      const metricValues = initToDefault(initialValues, UNITS.METRIC);
      setMetricWeight(produce((w) => {
        w.kg = metricValues.weightOne;
        w.fraction = metricValues.weightTwo;
      }));
      setMetricHeight(produce((h) => {
        h.cm = metricValues.heightOne;
        h.mm = metricValues.heightTwo;
      }));
    }
  }, [initialValues]);
  // --

  // -- Adjusting value of the form
  React.useEffect(() => {
    if (imperialUnitsWatcher) {
      setValue('heightOne', imperialHeight.ft, { shouldValidate: true });
      setValue('heightTwo', imperialHeight.in, { shouldValidate: true });
      setValue('weightOne', imperialWeight.lbs, { shouldValidate: true });
      setValue('weightTwo', imperialWeight.fraction, { shouldValidate: true });
    } else {
      setValue('heightOne', metricHeight.cm, { shouldValidate: true });
      setValue('heightTwo', metricHeight.mm, { shouldValidate: true });
      setValue('weightOne', metricWeight.kg, { shouldValidate: true });
      setValue('weightTwo', metricWeight.fraction, { shouldValidate: true });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imperialUnitsWatcher]);
  // --

  // useLog(termAcceptedWatcher);
  // useLog(isDirty);
  // useLog(`${isValid},${isDirty},${termAcceptedWatcher}`);
  // useuseLog(errors);

  const onSubmit = ({
    name, dob, units, heightOne, heightTwo, weightOne, weightTwo,
  }: FormData) => {
    console.log(errors);
    if (isValid) {
      try {
        const { cm, mm } = imperialUnitsWatcher
          ? FTandINtoCMandMM(heightOne, heightTwo)
          : { cm: heightOne, mm: heightTwo };
        const { kg, kgFraction } = imperialUnitsWatcher
          ? LBStoKG(weightOne, weightTwo)
          : { kg: weightOne, kgFraction: weightTwo };

        const newProfile = {
          name,
          dob,
          units,
          height: { cm, mm },
          weight: { kg, fraction: kgFraction },
        };

        writeProfileData(uid, newProfile as IProfile);

        if (initialValues) navigation.navigate('UserMenu');
      } catch (error) {
        Alert.alert('Error', 'Form was not submitted, something went wrong');
      }
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
                      const { cm, mm } = FTandINtoCMandMM(v, imperialHeight.in);
                      h.cm = cm;
                      h.mm = mm;
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
                        const { feet, inches } = CMandMMtoFTandIN(v, metricHeight.mm);
                        h.ft = feet;
                        h.in = inches;
                      }));
                      onChange(v);
                    }}
                    min={CONSTANTS.HEIGHT.METRIC.CM.MIN}
                    max={CONSTANTS.HEIGHT.METRIC.CM.MAX}
                  />
                )}
              <HelperText type="error">
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
                      const { cm, mm } = FTandINtoCMandMM(imperialHeight.ft, v);
                      h.cm = cm;
                      h.mm = mm;
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
                        const { feet, inches } = CMandMMtoFTandIN(metricHeight.cm, v);
                        h.ft = feet;
                        h.in = inches;
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
                    setMetricWeight(produce((w) => {
                      const { kg, kgFraction } = LBStoKG(v, imperialWeight.fraction);
                      w.kg = kg;
                      w.fraction = kgFraction;
                    }));
                    setImperialWeight(produce((w) => { w.lbs = v; }));
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
                      setMetricWeight(produce((w) => { w.kg = v; }));
                      setImperialWeight(produce((w) => {
                        const { lbs, lbsFraction } = KGtoLBS(v, metricWeight.fraction);
                        w.lbs = lbs;
                        w.fraction = lbsFraction;
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
                    setMetricWeight(produce((w) => {
                      const { kg, kgFraction } = LBStoKG(imperialWeight.lbs, v);
                      w.kg = kg;
                      w.fraction = kgFraction;
                    }));
                    setImperialWeight(produce((w) => { w.fraction = v; }));
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
                      setMetricWeight(produce((w) => { w.fraction = v; }));
                      setImperialWeight(produce((w) => {
                        const { lbs, lbsFraction } = KGtoLBS(metricWeight.kg, v);
                        w.lbs = lbs;
                        w.fraction = lbsFraction;
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
              name="termsAccepted"
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
        disabled={!(isValid && isDirty && termAcceptedWatcher)}
      >
        Submit
      </Button>
    </View>
  );
}

export default ProfileForm;
