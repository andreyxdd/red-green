import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { SvgCss } from 'react-native-svg';
import colors from '../styles/colors';
import { SIGNS } from '../types/enums';

interface ITraficLightIcon{
  sign: SIGNS
}

interface IIconColors{
  primary: string;
  secondary: string;
}

const roundIconXML = ({ primary, secondary }:IIconColors) => `<svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <title>yellow-status</title> <g id="Designs" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Today---Yellow" transform="translate(-32.000000, -111.000000)"> <g id="Group-2" transform="translate(32.000000, 108.000000)"> <g id="yellow-status" transform="translate(0.000000, 3.000000)"> <circle id="Oval-Copy-2" fill="${secondary}" fill-rule="nonzero" cx="12" cy="12" r="12"></circle> <circle id="Oval-Copy-2" fill="${primary}" cx="12" cy="12" r="7"></circle> </g> </g> </g> </g> </svg>`;

function TrafficLightIcon({ sign }: ITraficLightIcon) {
  if (Platform.OS === 'web') {
    return (
      <FontAwesome
        name="circle"
        size={28}
        color={sign && colors[sign].primary}
      />
    );
  }

  return (
    <SvgCss
      xml={roundIconXML(colors[sign])}
      width={28}
      height={28}
    />
  );
}

export default TrafficLightIcon;
