import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import { PLANS, PLAN_VIEWS, UNITS } from '../types/enums';

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  text: {
    color: 'grey',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
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

interface IToggle<T extends selectionTypes>{
  selection: T;
  options: IOptions<T>;
  setSelection: React.Dispatch<React.SetStateAction<T>>;
}

function Toggle<T extends selectionTypes>({ selection, options, setSelection }:IToggle<T>) {
  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setSelection(options.first.field);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: selection === options.first.field ? 2 : 0,
          borderColor: selection === options.first.field ? '#003F5E' : 'transparent',
        }}
        >
          <Text style={styles.text}>{options.first.text}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setSelection(options.second.field);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: selection === options.second.field ? 2 : 0,
          borderColor: selection === options.second.field ? '#003F5E' : 'transparent',
        }}
        >
          <Text style={styles.text}>{options.second.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Toggle;
