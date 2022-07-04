import { differenceInDays } from 'date-fns';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { UNITS } from '../../types/enums';
import { KGtoLBS } from '../../utils/calculate';

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
  goalWeight: number;
}

function PlanInfo({
  type, endDate, startDate, units, goalWeight,
}: IPlanInformation) {
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
            {differenceInDays(endDate, startDate) + 1}
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
            {differenceInDays(endDate, new Date())}
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
            {units === UNITS.IMPERIAL ? KGtoLBS(goalWeight) : goalWeight}
          </Text>
        </View>
      </View>
    </>
  );
}

export default PlanInfo;
