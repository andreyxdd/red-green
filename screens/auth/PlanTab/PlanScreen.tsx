import {
  StyleSheet, ScrollView, FlatList, View,
} from 'react-native';
import shallow from 'zustand/shallow';
import { differenceInDays } from 'date-fns';
import React from 'react';
import { Subheading, Text } from 'react-native-paper';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import PopupPlanMenu from '../../../components/PlanTab/PopupPlanMenu';
import HistoryPlot from '../../../components/PlanTab/HistoryPlot';
import { PLAN_VIEWS, SIGNS, UNITS } from '../../../types/enums';
import Toggle from '../../../components/Toggle';
// import colors from '../../../styles/colors';
import { getRelativeChange } from '../../../utils/calculate';
import BreakdownCard from '../../../components/PlanTab/BreakdownCard';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});

export default function PlanScreen() {
  const [plan, history, profileData] = useDataStore(
    (state: IDataStore) => [state.plan, state.history, state.profileData],
    shallow,
  );
  const [planView, setPlanView] = React.useState<PLAN_VIEWS>(PLAN_VIEWS.HISTORY);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {plan && history
        ? (
          <View style={{ flex: 4 }}>
            <View style={{
              flexDirection: 'row', paddingTop: 10, paddingBottom: 6, borderBottomWidth: 1, borderColor: '#ccc',
            }}
            >
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>Current plan:</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.text}>{plan.type}</Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ccc',
            }}
            >
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>Duration:</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.text}>
                  {differenceInDays(plan.goalDate, new Date())}
                  {/* plan.startDate) */}
                  {' '}
                  days
                </Text>
              </View>
            </View>
            <View style={{
              flexDirection: 'row', paddingVertical: 6,
            }}
            >
              <View style={{ flex: 2 }}>
                <Text style={styles.label}>
                  Goal Weight,
                  {' '}
                  {profileData?.units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
                  :
                </Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text style={styles.text}>{plan.goalWeight.toFixed(1)}</Text>
              </View>
            </View>
            <Toggle
              selection={planView}
              options={{
                first: { field: PLAN_VIEWS.HISTORY, text: 'HISTORY' },
                second: { field: PLAN_VIEWS.BREAKDOWN, text: 'BREAKDOWN' },
              }}
              setSelection={setPlanView}
              style={{ marginVertical: 6 }}
            />
            {planView === PLAN_VIEWS.HISTORY
              ? (
                <ScrollView contentContainerStyle={{
                  flexGrow: 1,
                  justifyContent: 'flex-start',
                }}
                >
                  <HistoryPlot history={history.slice().reverse()} plan={plan} />
                </ScrollView>
              )
              : (
                <FlatList
                  data={history}
                  renderItem={({ item }) => {
                    const relativeChange = getRelativeChange(plan.goalWeight, item.weightIn);

                    let sign;
                    if (relativeChange > 2.0) {
                      sign = SIGNS.RED;
                    } else if (relativeChange < 0.0) {
                      sign = SIGNS.GREEN;
                    } else {
                      sign = SIGNS.YELLOW;
                    }

                    return (
                      <BreakdownCard
                        date={item.date}
                        sign={sign}
                        weighIn={item.weightIn}
                        goalWeight={plan.goalWeight}
                        units={profileData?.units === UNITS.IMPERIAL ? 'lbs' : 'kg'}
                      />
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              )}
          </View>
        ) : (
          <View style={[styles.container, { width: '80%', alignSelf: 'center' }]}>
            <Subheading style={{ width: '100%', marginVertical: 12, textAlign: 'center' }}>
              No Availble Data Yet
            </Subheading>
          </View>
        )}
      <PopupPlanMenu />
    </View>
  );
}
