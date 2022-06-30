import React from 'react';
import {
  StyleSheet, View, Pressable, Keyboard, ViewStyle,
} from 'react-native';
import { useTheme, Caption } from 'react-native-paper';
import { PLANS, PLAN_VIEWS, UNITS } from '../types/enums';

const styles = StyleSheet.create({
  text: { textAlign: 'center' },
});

type selectionTypes = PLANS | PLAN_VIEWS | UNITS;

interface IOption<T extends selectionTypes> {
  field: T;
  text: string;
}

interface IOptions<T extends selectionTypes> {
  first: IOption<T>;
  second: IOption<T>;
}
export interface IToggle<T extends selectionTypes>{
  selection: T;
  options: IOptions<T>;
  setSelection: React.Dispatch<React.SetStateAction<T>> | ((val: T) => void);
  style?: ViewStyle;
}

function Toggle<T extends selectionTypes>({
  selection, options, setSelection, style,
}: IToggle<T>) {
  const { colors } = useTheme();

  return (
    <View style={[{ flexDirection: 'row' }, style]}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setSelection(options.first.field);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: selection === options.first.field ? 2 : 0,
          borderColor: selection === options.first.field ? colors.primary : 'transparent',
        }}
        >
          <Caption style={styles.text}>{options.first.text}</Caption>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
          setSelection(options.second.field);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: selection === options.second.field ? 2 : 0,
          borderColor: selection === options.second.field ? colors.primary : 'transparent',
        }}
        >
          <Caption style={styles.text}>{options.second.text}</Caption>
        </View>
      </Pressable>
    </View>
  );
}

export default Toggle;
