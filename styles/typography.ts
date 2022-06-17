import { StyleSheet } from 'react-native';
import { fonts, colors } from './base';

export default StyleSheet.create({
  heading: {
    color: colors.black,
    fontWeight: '800',
    fontSize: fonts.sizes.lg,
  },
  secondaryHeading: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fonts.sizes.md,
  },
  label: {
    color: colors.black,
    fontWeight: '600',
    fontSize: fonts.sizes.sm,
  },
  buttonContained: {
    color: colors.white,
    fontWeight: '600',
    fontSize: fonts.sizes.sm,
  },
  buttonOutlined: {
    color: colors.additional,
    fontWeight: '600',
    fontSize: fonts.sizes.sm,
  },
  googleButton: {
    color: colors.white,
    fontWeight: '500',
    fontSize: fonts.sizes.lg,
  },
});
