import { StyleSheet } from 'react-native';
import { colors } from './base';

export default StyleSheet.create({
  default: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
  contained: {
    backgroundColor: colors.additional,
    borderRadius: 10,
  },
  outlined: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: colors.additional,
    borderWidth: 2,
  },
  apple: {
    height: 50,
  },
  google: {
    backgroundColor: colors.google,
    borderRadius: 10,
  },
});
