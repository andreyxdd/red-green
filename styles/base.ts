import { Dimensions } from 'react-native';

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const colors = {
  RED: '#F3533A',
  YELLOW: '#FCF55F',
  GREEN: '#8AD879',
  additional: '#5ACFC9',
  google: '#4C8BF5',
  white: 'white',
  black: 'black',
};

export const paddings = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  sizes: {
    xs: 12,
    sm: 16,
    md: 18,
    lg: 20,
    xl: 24,
  },
  type: 'Cochin',
};
