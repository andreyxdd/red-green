import React from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Keyboard,
} from 'react-native';
import { PLAN_VIEWS } from '../../types';

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

interface IReviewToggle {
  planView: PLAN_VIEWS;
  setPlanView: React.Dispatch<React.SetStateAction<PLAN_VIEWS>>;
}

function PlanViewToggle({ planView, setPlanView }:IReviewToggle) {
  return (
    <View style={styles.rowContainer}>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setPlanView(PLAN_VIEWS.HISTORY);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: planView === PLAN_VIEWS.HISTORY ? 2 : 0,
          borderColor: planView === PLAN_VIEWS.HISTORY ? '#003F5E' : 'transparent',
        }}
        >
          <Text style={styles.text}>HISTORY PLOT</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          setPlanView(PLAN_VIEWS.BREAKDOWN);
        }}
        style={{ flex: 2 }}
      >
        <View style={{
          borderBottomWidth: planView === PLAN_VIEWS.BREAKDOWN ? 2 : 0,
          borderColor: planView === PLAN_VIEWS.BREAKDOWN ? '#003F5E' : 'transparent',
        }}
        >
          <Text style={styles.text}>BREAKDOWN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default PlanViewToggle;
