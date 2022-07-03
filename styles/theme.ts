import { Dimensions } from 'react-native';
import { configureFonts, DefaultTheme } from 'react-native-paper';
import { RFValue } from 'react-native-responsive-fontsize';

export const fullHeight = Dimensions.get('window').height;
export const fullWidth = Dimensions.get('window').width;

const fontConfig = {
  web: {
    regular: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    medium: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    light: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    thin: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
  },
  ios: {
    regular: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    medium: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    light: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
    thin: {
      fontSize: RFValue(14, fullHeight),
      fontWeight: 'normal',
    },
  },
  android: {
    regular: {
      fontWeight: 'normal',
      fontSize: RFValue(14, fullHeight),
    },
    medium: {
      fontWeight: 'normal',
      fontSize: RFValue(14, fullHeight),
    },
    light: {
      fontWeight: 'normal',
      fontSize: RFValue(14, fullHeight),
    },
    thin: {
      fontWeight: 'normal',
      fontSize: RFValue(14, fullHeight),
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
