import React from 'react';
import {
  StyleSheet, View, ScrollView, Platform,
} from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import { SvgCss } from 'react-native-svg';
import { FontAwesome } from '@expo/vector-icons';
import { SIGNS } from '../../types/enums';
import GreenDay from './GreenDay';
import YellowDay from './YellowDay';
import RedDay from './RedDay';
import colors from '../../styles/colors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
  },
});

interface IIconColors{
  primary: string;
  secondary: string;
}

const roundIconXML = ({ primary, secondary }:IIconColors) => `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>yellow-status</title> <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Today---Yellow" transform="translate(-32.000000, -111.000000)"> <g id="Group-2" transform="translate(32.000000, 108.000000)"> <g id="yellow-status" transform="translate(0.000000, 3.000000)"> <circle id="Oval-Copy-2" fill="${secondary}" fill-rule="nonzero" cx="12" cy="12" r="12"></circle> <circle id="Oval-Copy-2" fill="${primary}" cx="12" cy="12" r="7"></circle> </g> </g> </g> </g> </svg>`;

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
        {Platform.OS === 'web'
          ? (
            <FontAwesome
              name="circle"
              size={28}
              color={sign && colors[sign].primary}
            />
          )
          : (
            <SvgCss
              xml={roundIconXML(colors[sign])}
              width={28}
              height={28}
            />
          )}
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
