import {
  StyleProp, TextStyle, StyleSheet, Platform, Dimensions,
} from 'react-native';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import { UNITS } from '../../../types/enums';
import HeightpickerImperial from './HeightpickerImperial';
import HeightpickerMetric from './HeightpickerMetric';

export const styles = StyleSheet.create({
  picker: {
    marginTop: 0,
    height: Platform.OS === 'ios' ? 'auto' : 100,
    width: Dimensions.get('window').width * 0.3,
  },
  BSRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export interface IWeightpicker {
  handleChange: (v: number) => void;
  value: number;
  label: string;
  style?: StyleProp<TextStyle>;
  error: boolean;
}

function Heightpickers({
  handleChange, value, label, style, error,
}: IWeightpicker) {
  const units = useDataStore((state: IDataStore) => state.profileData?.units);

  if (units === UNITS.IMPERIAL) {
    return (
      <HeightpickerImperial
        handleChange={handleChange}
        value={value}
        label={`${label}, ft/in`}
        error={error}
        style={style}
      />
    );
  }

  return (
    <HeightpickerMetric
      handleChange={handleChange}
      value={value}
      label={`${label}, cm`}
      error={error}
      style={style}
    />
  );
}
export default Heightpickers;
