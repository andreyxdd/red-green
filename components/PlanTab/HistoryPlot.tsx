import React from 'react';
import { View } from 'react-native';
import { Subheading } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { format } from 'date-fns';
import { dimensions } from '../../styles/base';
import { IHistoryItem, IPlan } from '../../types/data';
import { getRelativeChange } from '../../utils/calculate';
import colors from '../../styles/colors';
import { SIGNS } from '../../types/enums';

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(63, 143, 244, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  propsForVerticalLabels: {
    fontSize: '8',
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
            color: (opacity = 1) => `rgb(98, 0, 238, ${opacity})`,
            strokeWidth: 3,
          },
          {
            data: new Array(history.length).fill(plan.goalWeight),
            color: (opacity = 1) => `rgb(190, 190, 190, ${opacity})`, // optional
            strokeWidth: 2, // optional
          },
          {
            data: [plan.goalWeight - plan.goalWeight / 30], // min
            withDots: false,
          },
          {
            data: [plan.goalWeight + plan.goalWeight / 30], // max
            withDots: false,
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
        height={dimensions.fullHeight / 1.5}
        chartConfig={chartConfig}
        bezier
        verticalLabelRotation={-75}
        xLabelsOffset={35}
        // hidePointsAtIndex={[...new Array(history.length).keys()].filter((n) => n % 2 !== 0)}
        getDotColor={(dataPoint) => {
          const relativeChange = getRelativeChange(plan.goalWeight, dataPoint);

          if (dataPoint === plan.goalWeight) {
            return 'transparent';
          }

          if (relativeChange > 2.0) {
            return colors[SIGNS.RED].secondary;
          } if (relativeChange < 0.0) {
            return colors[SIGNS.GREEN].secondary;
          }
          return colors[SIGNS.YELLOW].secondary;
        }}
      />
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default HistoryPlot;
