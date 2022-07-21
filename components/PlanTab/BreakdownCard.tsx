import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import { Card, Text } from 'react-native-paper';
import { SIGNS, UNITS } from '../../types/enums';
import colors from '../../styles/colors';
import TrafficLightIcon from '../TrafficLightIcon';
import { IBodyMeasure } from '../../types/data';

const styles = StyleSheet.create({
  column: {
    alignSelf: 'center',
    flexDirection: 'column',
    marginHorizontal: 16,
  },
  row: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    marginVertical: 2,
  },
});

interface IBreakdownCard{
  goalWeight: {
    METRIC: number,
    IMPERIAL: number,
  };
  weighIn: IBodyMeasure;
  date: Date;
  sign: SIGNS;
  units: UNITS;
}

function BreakdownCard({
  goalWeight, weighIn, date, sign, units,
}: IBreakdownCard) {
  return (
    <Card style={{ marginVertical: 4 }}>
      <Card.Content>
        <View style={[styles.row, { marginLeft: 32 }]}>
          <View style={styles.column}>
            <TrafficLightIcon sign={sign} />
          </View>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={{ color: colors[sign].primary, fontWeight: '600' }}>{format(date, 'PPPP')}</Text>
            </View>
            <View style={styles.row}>
              <Text style={{ fontWeight: '200', marginRight: 4 }}>
                Daily Goal Weight,
                {' '}
                {units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
                :
              </Text>
              <Text style={{ fontWeight: '200', marginRight: 4 }}>
                {' '}
                {goalWeight[units]}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{ marginRight: 4 }}>
                Achieved Weight,
                {' '}
                {units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
                :
              </Text>
              <Text style={{ marginRight: 4 }}>
                {' '}
                {weighIn[units].integer + weighIn[units].fraction / 10}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

export default BreakdownCard;
