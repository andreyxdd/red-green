import { View, ViewProps } from './Themed';

function Container(props: ViewProps) {
  return (
    <View
      {...props}
      style={[props.style, {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.0)',
      }]}
    >
      {props.children}
    </View>
  );
}

export default Container;
