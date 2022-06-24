import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { dimensions } from '../../styles/base';
import { IHistoryItem, IPlan } from '../../types';
import { getRelativeChange } from '../../utils/calculate';

const chartConfig = {
  backgroundGradientFrom: '#F0F0F0',
  backgroundGradientTo: '#F0F0F0',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  propsForVerticalLabels: {
    fontSize: '10',
  },
};

interface IHistoryPlot{
  history: Array<IHistoryItem>
  plan: IPlan | null;
}

function HistoryPlot({ history, plan }: IHistoryPlot) {
  const data = React.useMemo(() => {
    if (history.length > 0 && plan) {
      return {
        labels: history.map((item: IHistoryItem) => format(item.date, 'PP')),
        datasets: [
          {
            data: history.map((item: IHistoryItem) => item.weightIn),
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 4, // optional
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

  if (data && plan) {
    return (
      <LineChart
        data={data}
        width={dimensions.fullWidth}
        height={dimensions.fullHeight / 1.8}
        chartConfig={chartConfig}
        bezier
        verticalLabelRotation={-75}
        xLabelsOffset={45}
        // hidePointsAtIndex={[...new Array(history.length).keys()].filter((n) => n % 2 !== 0)}
        getDotColor={(dataPoint) => {
          const relativeChange = getRelativeChange(plan.goalWeight, dataPoint);

          if (dataPoint === plan.goalWeight) {
            return 'transparent';
          }

          if (relativeChange > 2.0) {
            return 'red';
          } if (relativeChange < 0.0) {
            return 'green';
          }
          return 'yellow';
        }}
      />
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default HistoryPlot;
