import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { SIGNS } from '../../types/enums';
import TrafficLightIcon from '../TrafficLightIcon';
import GreenDay from './GreenDay';
import YellowDay from './YellowDay';
import RedDay from './RedDay';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

const contentArray = (sign: SIGNS) => {
  switch (sign) {
    case SIGNS.GREEN: {
      return GreenDay;
    }
    case SIGNS.YELLOW: {
      return YellowDay;
    }
    case SIGNS.RED: {
      return RedDay;
    }
    default: {
      return [];
    }
  }
};

interface ITodaysRecommendations{
  sign: SIGNS;
}

function TodaysRecommendations({ sign }:ITodaysRecommendations) {
  return (
    <ScrollView contentContainerStyle={[styles.container, { flex: 1 }]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginHorizontal: 20,
          marginVertical: 12,
        }}
      >
        <TrafficLightIcon sign={sign} />
        <Headline
          style={{ marginVertical: 12, marginLeft: 20 }}
        >
          {sign}
          {' '}
          DAY
        </Headline>
      </View>
      {contentArray(sign).map((item) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'center',
            width: '90%',
            marginLeft: 10,
            marginVertical: 12,
          }}
          key={`view-${item.key}`}
        >
          {item.icon}
          <Subheading
            style={{
              flex: 1,
              flexWrap: 'wrap',
              marginHorizontal: 20,
            }}
            key={item.key}
          >
            {item.content}
          </Subheading>
        </View>
      ))}
    </ScrollView>
  );
}

export default TodaysRecommendations;
