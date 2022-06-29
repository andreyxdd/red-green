import {
  StyleSheet, ScrollView, FlatList,
} from 'react-native';
import shallow from 'zustand/shallow';
import { differenceInDays, format } from 'date-fns';
import React from 'react';
import { Subheading } from 'react-native-paper';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import PopupPlanMenu from '../../../components/PlanTab/PopupPlanMenu';
import HistoryPlot from '../../../components/PlanTab/HistoryPlot';
import { View, Text } from '../../../components/Themed';
import { PLAN_VIEWS, SIGNS } from '../../../types/enums';
import Toggle from '../../../components/Toggle';
import { colors } from '../../../styles/base';
import { getRelativeChange } from '../../../utils/calculate';

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
  const [plan, history] = useDataStore((state: IDataStore) => [state.plan, state.history], shallow);
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
                  {differenceInDays(plan.endDate, plan.startDate)}
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
                <Text style={styles.label}>Goal Weight:</Text>
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

                    let color;
                    if (relativeChange > 2.0) {
                      color = SIGNS.RED;
                    } else if (relativeChange < 0.0) {
                      color = SIGNS.GREEN;
                    } else {
                      color = SIGNS.YELLOW;
                    }
                    return (
                      <View style={{
                        backgroundColor: colors[color],
                        borderColor: '#ccc',
                        borderWidth: 1,
                        borderRadius: 4,
                        padding: 20,
                        marginVertical: 6,
                        marginHorizontal: 16,
                        flex: 4,
                      }}
                      >
                        <View style={{ flexDirection: 'row', backgroundColor: colors[color] }}>
                          <View style={{ flex: 1, backgroundColor: colors[color] }}>
                            <Text style={styles.label}>Weigh-in:</Text>
                          </View>
                          <View style={{ flex: 3, backgroundColor: colors[color] }}>
                            <Text style={styles.text}>{item.weightIn}</Text>
                          </View>
                        </View>
                        <View style={{ flexDirection: 'row', backgroundColor: colors[color] }}>
                          <View style={{ flex: 1, backgroundColor: colors[color] }}>
                            <Text style={styles.label}>When:</Text>
                          </View>
                          <View style={{ flex: 3, backgroundColor: colors[color] }}>
                            <Text style={styles.text}>{format(item.date, 'PPPP')}</Text>
                          </View>
                        </View>
                      </View>
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
