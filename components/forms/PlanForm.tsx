import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
// import { useNavigation } from '@react-navigation/native';

import shallow from 'zustand/shallow';
import Datepicker from '../Pickers/Datepickers/Datepicker';
import { PLANS, UNITS } from '../../types/enums';
import Toggle from '../Toggle';
import Measurepicker from '../Pickers/Measurepickers/Measurepicker';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';

const REGEX = {
  personalName: /^[a-z ,.'-]+$/i,
  measureValue: /^\d*\.?\d{1}$/,
};

const ERROR_MESSAGES = {
  REQUIRED: 'This Field Is Required',
  NAME: 'Not a Valid Name',
  TERMS: 'Terms Must Be Accepted To Continue',
  INVALID_VALUE: 'Not a Valid Value',
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

export interface FormData{
  planType: PLANS;
  goalWeight: number;
  goalDate: Date;
  startWeight?: number;
}

export interface IPlanForm {
  initialValues?: FormData;
  uid: string;
}

function PlanForm({ initialValues, uid }: IPlanForm) {
  const [isImperialUnits, profileWeight] = useDataStore(
    (state: IDataStore) => [state.profileData?.units === UNITS.IMPERIAL, state.profileData?.weight],
    shallow,
  );

  // const navigation = useNavigation();

  const {
    control, handleSubmit, formState: { errors, isValid, isDirty }, watch,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: initialValues && initialValues,
  });

  const isLosingPlanWatcher = watch('planType') === PLANS.LOSING;

  const onSubmit = ({ goalWeight, goalDate, startWeight }: FormData) => {
    if (isValid) {
      try {
        console.log(uid);
        console.log({ goalWeight, goalDate, startWeight });
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      {initialValues ? null : (
        <Controller
          control={control}
          name="planType"
          defaultValue={PLANS.MAINTENANCE}
          render={({ field: { onChange, value } }) => (
            <Toggle
              selection={value}
              options={{
                first: { field: PLANS.MAINTENANCE, text: 'Maintaining Weight' },
                second: { field: PLANS.LOSING, text: 'Losing Weight' },
              }}
              setSelection={onChange}
              style={{ marginBottom: 14, width: '90%', alignSelf: 'center' }}
            />
          )}
        />
      )}
      <Controller
        control={control}
        name="goalWeight"
        defaultValue={initialValues ? initialValues.goalWeight : 0.0}
        rules={{
          required: { message: ERROR_MESSAGES.REQUIRED, value: true },
          pattern: {
            message: ERROR_MESSAGES.INVALID_VALUE,
            value: REGEX.measureValue,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <Measurepicker
              value={value}
              label={`Goal weight, ${isImperialUnits ? 'lbs' : 'kg'}`}
              style={styles.input}
              error={!!errors.goalWeight}
              handleBlur={onBlur}
              handleChange={onChange}
              numOfWholePartOptions={isImperialUnits ? 320 : 100}
              wholeMinValue={isImperialUnits ? 85 : 40}
              numOfDecimalOptions={isImperialUnits ? undefined : 10}
            />
            <HelperText type="error">{errors.goalWeight?.message}</HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        defaultValue={initialValues ? initialValues.goalDate : new Date()}
        name="goalDate"
        rules={{
          required: { value: true, message: ERROR_MESSAGES.REQUIRED },
        }}
        render={({ field: { onChange, value } }) => (
          <>
            <Datepicker
              id="profile-form-datepicker"
              label="Gaol Date"
              style={styles.input}
              value={value}
              onChange={onChange}
              error={!!errors.goalDate}
              dateFormat="yyyy-MM-dd"
            />
            <HelperText type="error">{errors.goalDate?.message}</HelperText>
          </>
        )}
      />
      {isLosingPlanWatcher && !initialValues
        ? (
          <Controller
            control={control}
            name="startWeight"
            defaultValue={profileWeight && profileWeight}
            rules={{
              required: { message: ERROR_MESSAGES.REQUIRED, value: true },
              pattern: {
                message: ERROR_MESSAGES.INVALID_VALUE,
                value: REGEX.measureValue,
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <>
                <Measurepicker
                  value={value || 0.0}
                  label={`Start weight, ${isImperialUnits ? 'lbs' : 'kg'}`}
                  style={styles.input}
                  error={!!errors.startWeight}
                  handleBlur={onBlur}
                  handleChange={onChange}
                  numOfWholePartOptions={isImperialUnits ? 320 : 100}
                  wholeMinValue={isImperialUnits ? 85 : 40}
                  numOfDecimalOptions={isImperialUnits ? undefined : 10}
                />
                <HelperText type="error">{errors.startWeight?.message}</HelperText>
              </>
            )}
          />
        )
        : null}
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

export default PlanForm;
