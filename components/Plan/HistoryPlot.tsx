import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import shallow from 'zustand/shallow';
import useDataStore, { IDataStore } from '../../hooks/useDataStore';
import { dimensions } from '../../styles/base';

const chartConfig = {
  backgroundGradientFrom: '#F0F0F0',
  backgroundGradientTo: '#F0F0F0',
  color: (opacity = 0.8) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
};

function HistoryPlot() {
  const [history, plan] = useDataStore((state: IDataStore) => [state.history, state.plan], shallow);

  const data = React.useMemo(() => {
    if (history.length > 0 && plan) {
      return {
        labels: history.map((item) => item.date.toLocaleString(
          'en-US',
          { year: 'numeric', month: 'long', day: 'numeric' },
        )),
        datasets: [
          {
            data: history.map((item) => item.weightIn),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
          {
            data: new Array(history.length).fill(plan.goalWeight),
            strokeWidth: 4, // optional
          },
        ],
        legend: ['Weigh-ins', 'Goal Weight'],
      };
    }
    return null;
  }, [history, plan]);

  if (data) {
    return (
      <LineChart
        data={data}
        width={dimensions.fullWidth}
        height={dimensions.fullHeight / 2}
        chartConfig={chartConfig}
        bezier
      />
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default HistoryPlot;
