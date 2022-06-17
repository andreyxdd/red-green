import { StyleSheet } from 'react-native';
import { colors } from './base';

const common = StyleSheet.create({
  style: {
    width: '100%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
  },
});

export default StyleSheet.create({
  contained: {
    backgroundColor: colors.additional,
    borderRadius: 10,
    ...common,
  },
  outlined: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderColor: colors.additional,
    borderWidth: 2,
    ...common,
  },
  apple: {
    height: 50,
    ...common,
  },
  google: {
    backgroundColor: colors.google,
    borderRadius: 10,
    ...common,
  },
});
