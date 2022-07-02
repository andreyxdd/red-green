import React from 'react';
import { Keyboard, Pressable, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { verticalScale } from 'react-native-size-matters';
import { range } from '../../../utils/calculate';
import { IWeightpicker, styles } from './index';

const WHOLE_MIN_KG = 40;
const WHOLE_OPTIONS = 100;
const DECIMAL_OPTIONS = 10;

function WeightPickerMetric({
  handleChange, value, label, style, error,
}: IWeightpicker) {
  const pickerRef = React.useRef<RBSheet>(null);
  const handleToggle = () => {
    Keyboard.dismiss();
    if (pickerRef.current) {
      pickerRef.current.open();
    }
  };

  const wholePart = React.useMemo(() => Math.trunc(value), [value]);
  const decimalPart = React.useMemo(() => {
    const decimal = Number((`${value}`).split('.')[1]);
    return Number.isNaN(decimal) ? 0 : decimal;
  }, [value]);

  const handleWholePartChange = (v: number) => {
    handleChange(Number(`${v}.${decimalPart}`));
  };

  const handleDecimalPartChange = (v: number) => {
    handleChange(Number(`${wholePart}.${v}`));
  };

  return (
    <>
      <Pressable onPress={handleToggle}>
        <View pointerEvents="none">
          <TextInput
            label={label}
            style={style}
            value={value.toString()}
            error={error}
          />
        </View>
      </Pressable>
      <RBSheet
        ref={pickerRef}
        height={verticalScale(200)}
        openDuration={250}
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <View style={styles.BSRowContainer}>
          <Picker
            selectedValue={wholePart}
            style={styles.picker}
            onValueChange={handleWholePartChange}
          >
            {range(WHOLE_OPTIONS, WHOLE_MIN_KG).map((v:number) => (
              <Picker.Item
                key={uuidv4()}
                label={v.toString()}
                value={v}
              />
            ))}
          </Picker>
          <Picker
            selectedValue={decimalPart}
            style={styles.picker}
            onValueChange={handleDecimalPartChange}
          >
            {range(DECIMAL_OPTIONS).map((v:number) => (
              <Picker.Item
                key={uuidv4()}
                label={v.toString()}
                value={v}
              />
            ))}
          </Picker>
        </View>
      </RBSheet>
    </>

  );
}

export default WeightPickerMetric;
