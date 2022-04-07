import { Text, TextProps } from './Themed';

// eslint-disable-next-line import/prefer-default-export
export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />;
}
