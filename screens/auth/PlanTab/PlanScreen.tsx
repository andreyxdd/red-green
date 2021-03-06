import {
  StyleSheet, ScrollView, FlatList, View, Platform,
} from 'react-native';
import shallow from 'zustand/shallow';
import React from 'react';
import { Subheading } from 'react-native-paper';
import useDataStore, { IDataStore } from '../../../hooks/useDataStore';
import PopupPlanMenu from '../../../components/PlanTab/PopupPlanMenu';
import HistoryPlot from '../../../components/PlanTab/HistoryPlot';
import { PLANS, PLAN_VIEWS } from '../../../types/enums';
import Toggle from '../../../components/Toggle';
import BreakdownCard from '../../../components/PlanTab/BreakdownCard';
import PlanInfo from '../../../components/PlanTab/PlanInfo';

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
});

function PlanScreen() {
  const [plan, history, profileData] = useDataStore(
    (state: IDataStore) => [state.plan, state.history, state.profile],
    shallow,
  );
  const [planView, setPlanView] = React.useState<PLAN_VIEWS>(PLAN_VIEWS.HISTORY);

  return (
    <View style={[styles.container, { flex: 1 }]}>
      {plan && plan.active && history && profileData
        ? (
          <View style={{ flex: 4 }}>
            <PlanInfo
              type={plan.type === PLANS.MAINTENANCE ? 'Maintaining Weight' : 'Losing Weight'}
              endDate={plan.goalDate}
              startDate={plan.startDate}
              units={profileData.units}
              goalWeight={plan.goalWeight}
            />
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
                  {Platform.OS === 'web'
                    ? (
                      <HistoryPlot
                        history={history}
                        plan={plan}
                        units={profileData.units}
                      />
                    )
                    : null}
                </ScrollView>
              )
              : (
                <FlatList
                  data={history}
                  renderItem={({ item }) => {
                    if (item.weighIn && item.sign && profileData) {
                      return (
                        <BreakdownCard
                          date={item.date}
                          sign={item.sign}
                          weighIn={item.weighIn}
                          goalWeight={item.dailyGoal}
                          units={profileData.units}
                        />
                      );
                    }
                    return null;
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

export default PlanScreen;
