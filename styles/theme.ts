import { RFValue } from 'react-native-responsive-fontsize';
import { configureFonts, DefaultTheme } from 'react-native-paper';
import { dimensions } from './base';

const fontConfig = {
  web: {
    regular: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    medium: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    light: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    thin: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    medium: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    light: {
      fontSize: RFValue(14, dimensions.fullHeight),
      fontWeight: 'normal',
    },
    thin: {
      fontSize: RFValue(14, dimensions.fullHeight),
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
