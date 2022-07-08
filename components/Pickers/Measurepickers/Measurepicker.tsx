import React from 'react';
import {
  Keyboard, Pressable, View, StyleSheet, Platform, Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { Picker } from '@react-native-picker/picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { verticalScale } from 'react-native-size-matters';
import { range } from '../../../utils/calculate';
import { IMeasurepicker } from './index';

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

export interface IMeasurepickerMobile extends IMeasurepicker{
  min: number;
  max: number;
}

function MeasurepickerMobile({
  handleChange, value, label, style, error, min, max,
}: IMeasurepickerMobile) {
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
        height={verticalScale(220)}
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
            selectedValue={value}
            style={styles.picker}
            onValueChange={handleChange}
          >
            {range({ from: min, to: max }).map((v: number) => (
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

export default MeasurepickerMobile;
