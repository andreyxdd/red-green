import { RFValue } from 'react-native-responsive-fontsize';
import { configureFonts, DefaultTheme } from 'react-native-paper';
import { dimensions } from './base';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
      fontSize: RFValue(14, dimensions.fullHeight),
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
      fontSize: RFValue(14, dimensions.fullHeight),
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
      fontSize: RFValue(14, dimensions.fullHeight),
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
      fontSize: RFValue(14, dimensions.fullHeight),
    },
  },
};

const theme = {
  ...DefaultTheme,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  fonts: configureFonts(fontConfig),
};

export default theme;
