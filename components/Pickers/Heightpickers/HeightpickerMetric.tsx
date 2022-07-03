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

const WHOLE_MIN_CM = 80;
const WHOLE_OPTIONS = 150;

function HeightpickerMetric({
  handleChange, value, label, style, error,
}: IWeightpicker) {
  const pickerRef = React.useRef<RBSheet>(null);
  const handleToggle = () => {
    Keyboard.dismiss();
    if (pickerRef.current) {
      pickerRef.current.open();
    }
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
        <Picker
          selectedValue={value}
          style={styles.picker}
          onValueChange={handleChange}
        >
          {range(WHOLE_OPTIONS, WHOLE_MIN_CM).map((v:number) => (
            <Picker.Item
              key={uuidv4()}
              label={v.toString()}
              value={v}
            />
          ))}
        </Picker>
      </RBSheet>
    </>

  );
}

export default HeightpickerMetric;
