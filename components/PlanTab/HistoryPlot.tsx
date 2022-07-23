import format from 'date-fns/format';
import React from 'react';
import { View } from 'react-native';
import { Subheading, useTheme } from 'react-native-paper';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import colors from '../../styles/colors';
import { IHistoryItem, IPlan } from '../../types/data';
import { SIGNS, UNITS } from '../../types/enums';

interface IHistoryPlot{
  history: Array<IHistoryItem>
  plan: IPlan | null;
  units: UNITS;
}

export interface IData{
  date: string;
  dailyGoal: number;
  weighIn: number;
  sign: SIGNS,
}

function CustomizedDot(props: any) {
  const {
    cx, cy, r, payload,
  } = props;
  if (!payload.sign) {
    return <svg />;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  return ( // @ts-ignore
    <svg fill={colors[payload.sign].primary} fillOpacity={0.4}>
      <circle cx={cx} cy={cy} r={2.5 * r} />
    </svg>
  );
}

function CustomizedActiveDot(props: any) {
  const {
    cx, cy, r, payload,
  } = props;

  if (!payload.sign) {
    return <svg />;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  return ( // @ts-ignore
    <svg fill={colors[payload.sign].primary} fillOpacity={0.8}>
      <circle cx={cx} cy={cy} r={r} />
    </svg>
  );
}

function Example({
  history, plan, units,
}: IHistoryPlot) {
  const data = React.useMemo(() => history.map((item: IHistoryItem) => {
    if (item.weighIn && item.sign) {
      return {
        date: format(item.date, 'PP'),
        'Daily Goal': item.dailyGoal[units],
        'Weigh In': item.weighIn[units].integer + item.weighIn[units].fraction / 10,
        sign: item.sign,
      };
    }

    /*
    if (item.date <= new Date('July 30, 2022')) {
      const lastWeighIn = history.filter(
        (it: IHistoryItem) => it.weighIn && it.date < item.date,
      ).pop();

      if (lastWeighIn && lastWeighIn.weighIn) {
        return {
          date: format(item.date, 'PP'),
          'Daily Goal': item.dailyGoal[units],
          'Weigh In': lastWeighIn.weighIn[units].integer + lastWeighIn.weighIn[units].fraction / 10,
        };
      }

      return {
        date: format(item.date, 'PP'),
        'Daily Goal': item.dailyGoal[units],
        'Weigh In': profileWeight[units].integer + profileWeight[units].fraction / 10,
      };
    }
    */

    return {
      date: format(item.date, 'PP'),
      'Daily Goal': item.dailyGoal[units],
    };
  }), [history, units]);

  const { colors: paperColors } = useTheme();

  if (data && plan) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorDailyGoals" x1="0" y1="0" x2="0" y2="1">
              <stop offset="3%" stopColor={paperColors.primary} stopOpacity={0.1} />
              <stop offset="97%" stopColor={paperColors.primary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" interval={2} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend verticalAlign="top" height={36} iconType="plainline" />
          <Area
            type="linear"
            dataKey="Daily Goal"
            strokeOpacity={0.15}
            stroke={paperColors.backdrop}
            fillOpacity={1}
            strokeWidth={4}
            fill="url(#colorDailyGoals)"
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="Weigh In"
            strokeOpacity={0.3}
            stroke={paperColors.primary}
            strokeWidth={4}
            dot={<CustomizedDot />}
            activeDot={<CustomizedActiveDot />}
            strokeDasharray="14 14"
          />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return <View><Subheading>No Availble Data</Subheading></View>;
}

export default Example;
