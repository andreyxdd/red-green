import React from 'react';
import {
  Dimensions,
  Keyboard,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  Text,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import { TextInput } from 'react-native-paper';

const styles = StyleSheet.create({
  picker: {
    marginTop: 0,
    height: Platform.OS === 'ios' ? 'auto' : 100,
    width: Dimensions.get('window').width * 0.25,
  },
  BSRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 10,
  },
});

export interface IWeightPicker {
  // units: UNITS;
  value: number;
  label: string;
  style?: StyleProp<TextStyle>;
  error: boolean;
}

function WeightPicker({
  value, label, style, error,
}: IWeightPicker) {
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
        height={300}
        openDuration={250}
        closeOnDragDown
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      >
        <View style={styles.BSRowContainer}>
          <Text>kg</Text>
        </View>
        <View style={styles.BSRowContainer}>
          <Picker
            mode="dropdown"
            selectedValue="5"
            style={styles.picker}
            onValueChange={(v) => { console.log(v); }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
          </Picker>
          <Picker
            mode="dropdown"
            selectedValue="3"
            style={{
              marginTop: 0,
              height: Platform.OS === 'ios' ? 'auto' : 100,
              width: Dimensions.get('window').width * 0.25,
            }}
            onValueChange={(v) => { console.log(v); }}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
            <Picker.Item label="6" value="6" />
            <Picker.Item label="7" value="7" />
            <Picker.Item label="8" value="8" />
            <Picker.Item label="9" value="9" />
            <Picker.Item label="10" value="10" />
            <Picker.Item label="11" value="11" />
          </Picker>
        </View>
      </RBSheet>
    </>

  );
}

export default WeightPicker;
