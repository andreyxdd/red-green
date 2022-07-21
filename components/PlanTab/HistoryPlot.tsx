import React from 'react';
import { Platform, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { fullHeight, fullWidth } from '../../styles/theme';
import { IHistoryItem, IPlan } from '../../types/data';
import colors from '../../styles/colors';
import { UNITS } from '../../types/enums';

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  propsForVerticalLabels: {
    fontSize: '8',
  },
  propsForDots: {
    r: Platform.OS === 'web' ? '12' : '6',
    strokeWidth: '2',
    stroke: '#fff',
  },
};

interface IHistoryPlot{
  history: Array<IHistoryItem>
  plan: IPlan | null;
  units:UNITS
}

function HistoryPlot({ history, plan, units }: IHistoryPlot) {
  const plot = React.useMemo(() => {
    if (history.length > 0 && plan) {
      const dailyGoals = history.map(
        (item: IHistoryItem) => item.dailyGoal[units],
      );
      const maxDailyGoal = Math.max(...dailyGoals);
      const minDailyGoal = Math.min(...dailyGoals);

      const weignIns: Array<number> = [];
      history.forEach((item: IHistoryItem) => {
        if (item.weighIn !== undefined) {
          weignIns.push(item.weighIn[units].integer + item.weighIn[units].fraction / 10);
        }
      });

      const datasets = [
        {
          data: dailyGoals,
          color: (opacity = 1) => `rgb(190, 190, 190, ${opacity})`, // optional
          strokeWidth: 6, // optional
          withDots: false,
        },
        {
          data: [maxDailyGoal + maxDailyGoal / 30], // max
          withDots: false,
          color: (opacity = 1) => `rgb(98, 0, 238, ${opacity})`,
        },
        {
          data: [minDailyGoal - minDailyGoal / 10], // min
          withDots: false,
          color: (opacity = 1) => `rgb(98, 0, 238, ${opacity})`,
        },
      ];
      const legend = ['Goal Weight'];

      if (weignIns.length > 0) {
        datasets.push(
          {
            data: weignIns,
            color: (opacity = 1) => `rgb(98, 0, 238, ${opacity})`,
            strokeWidth: 3,
            withDots: true,
          },
        );
        legend.push('Weigh-ins');
      }

      return {
        labels: history.map((item: IHistoryItem) => format(item.date, 'PP')),
        datasets,
        legend,
      };
    }
    return null;
  }, [history, plan, units]);

  if (plot && plan) {
    return (
      <LineChart
        data={plot}
        width={fullWidth}
        height={fullHeight / 1.5}
        chartConfig={chartConfig}
        bezier
        verticalLabelRotation={Platform.OS === 'web' ? 0 : -75}
        xLabelsOffset={Platform.OS === 'web' ? 0 : 35}
        getDotColor={(dataPoint, dataPointIndex) => {
          const historyItem = history[dataPointIndex];

          if (historyItem.sign) return colors[historyItem.sign].secondary;

          return '#D3D3D3';
        }}
      />
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default HistoryPlot;
