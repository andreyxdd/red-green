import React from 'react';
import { Platform, View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { fullHeight, fullWidth } from '../../styles/theme';
import { IHistoryItem, IPlan } from '../../types/data';
import { getRelativeChange, KGtoLBS } from '../../utils/calculate';
import colors from '../../styles/colors';
import { SIGNS, UNITS } from '../../types/enums';

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
    r: '12',
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
        (item: IHistoryItem) => (units === UNITS.IMPERIAL
          ? KGtoLBS(item.dailyGoal) : item.dailyGoal),
      );
      const maxDailyGoal = Math.max(...dailyGoals);
      const minDailyGoal = Math.min(...dailyGoals);

      const weignIns: Array<number> = [];

      history.forEach((item: IHistoryItem) => {
        if (item.weighIn !== undefined) {
          weignIns.push(
            units === UNITS.IMPERIAL ? KGtoLBS(item.weighIn) : item.weighIn,
          );
        }
      });

      return {
        labels: history.map((item: IHistoryItem) => format(item.date, 'PP')),
        datasets: [
          {
            data: weignIns,
            color: (opacity = 1) => `rgb(98, 0, 238, ${opacity})`,
            strokeWidth: 3,
          },
          {
            data: dailyGoals,
            color: (opacity = 1) => `rgb(190, 190, 190, ${opacity})`, // optional
            strokeWidth: 2, // optional
            // withDots: false,
          },
          {
            data: [maxDailyGoal + maxDailyGoal / 30], // max
            withDots: false,
          },
          {
            data: [minDailyGoal - minDailyGoal / 10], // min
            withDots: false,
          },
        ],
        legend: ['Weigh-ins', 'Goal Weight'],
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
          const dailyGoal = plot.datasets[1].data[dataPointIndex];

          if (dailyGoal) {
            const relativeChange = getRelativeChange(dailyGoal, dataPoint);

            if (dataPoint === dailyGoal) {
              return '#D3D3D3';
            }

            if (relativeChange > 2.0) {
              return colors[SIGNS.RED].secondary;
            } if (relativeChange < 0.0) {
              return colors[SIGNS.GREEN].secondary;
            }
            return colors[SIGNS.YELLOW].secondary;
          }
          return '#D3D3D3';
        }}
      />
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default HistoryPlot;
