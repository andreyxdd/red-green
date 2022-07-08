import React from 'react';
import { StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import { Card, Text } from 'react-native-paper';
import { SIGNS } from '../../types/enums';
import colors from '../../styles/colors';
import TrafficLightIcon from '../TrafficLightIcon';
import { KGtoLBS } from '../../utils/conversions';
import { IWeight } from '../../types/data';

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
  goalWeight: IWeight;
  weighIn: IWeight;
  date: Date;
  sign: SIGNS;
  isImperialUnits: boolean;
}

function BreakdownCard({
  goalWeight, weighIn, date, sign, isImperialUnits,
}: IBreakdownCard) {
  const currenGoaltWeightValue = React.useMemo(() => {
    if (isImperialUnits) {
      const weight = KGtoLBS(goalWeight.kg, goalWeight.kgFraction);
      return weight.lbs + weight.lbsFraction / 10;
    }
    return goalWeight.kg + goalWeight.kgFraction / 10;
  }, [isImperialUnits, goalWeight]);

  const currenWeighInValue = React.useMemo(() => {
    if (isImperialUnits) {
      const weight = KGtoLBS(weighIn.kg, weighIn.kgFraction);
      return weight.lbs + weight.lbsFraction / 10;
    }
    return weighIn.kg + weighIn.kgFraction / 10;
  }, [isImperialUnits, weighIn]);

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
                {isImperialUnits ? 'lbs' : 'kg'}
                :
              </Text>
              <Text style={{ fontWeight: '200', marginRight: 4 }}>
                {' '}
                {currenGoaltWeightValue}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={{ marginRight: 4 }}>
                Achieved Weight,
                {' '}
                {isImperialUnits ? 'lbs' : 'kg'}
                :
              </Text>
              <Text style={{ marginRight: 4 }}>
                {' '}
                {currenWeighInValue}
              </Text>
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

export default BreakdownCard;
