import { differenceInDays } from 'date-fns';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import useLog from '../../hooks/useLog';
import { IBodyMeasure } from '../../types/data';
import { UNITS } from '../../types/enums';

const styles = StyleSheet.create({
  label: {
    fontWeight: '600',
    textAlign: 'right',
    paddingRight: 10,
  },
  text: {
    textAlign: 'left',
    fontWeight: '300',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  item: {
    flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ccc',
  },
});

interface IPlanInformation{
  type: string;
  endDate: Date;
  startDate: Date;
  units: UNITS;
  goalWeight: IBodyMeasure;
}

function PlanInfo({
  type, endDate, startDate, units, goalWeight,
}: IPlanInformation) {
  useLog(endDate);
  useLog(startDate);
  return (
    <>
      <View style={[styles.item, { paddingVertical: 0, paddingTop: 10, paddingBottom: 6 }]}>
        <View style={{ flex: 2 }}>
          <Text style={styles.label}>Current plan:</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.text}>{type}</Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={{ flex: 2 }}>
          <Text style={styles.label}>Total duration:</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.text}>
            {differenceInDays(endDate, startDate)}
            {' '}
            days
          </Text>
        </View>
      </View>
      <View style={styles.item}>
        <View style={{ flex: 2 }}>
          <Text style={styles.label}>Time left:</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.text}>
            {differenceInDays(endDate, new Date(new Date().setHours(0, 0, 0, 0)))}
            {' '}
            days
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', paddingVertical: 6 }}>
        <View style={{ flex: 2 }}>
          <Text style={styles.label}>
            Goal Weight,
            {' '}
            {units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
            :
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.text}>
            {goalWeight[units].integer + goalWeight[units].fraction / 10}
          </Text>
        </View>
      </View>
    </>
  );
}

export default PlanInfo;
