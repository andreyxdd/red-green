import React from 'react';
import {
  View, ViewStyle, StyleSheet, StyleProp,
} from 'react-native';
import { Subheading } from 'react-native-paper';

export interface IDivider{
  children?: React.ReactNode;
  width?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  divider: { flex: 1, height: 2, backgroundColor: '#ccc' },
  text: { width: 50, textAlign: 'center' },
});

function Divider({ children, containerStyle, width }: IDivider) {
  return (
    <View style={[styles.container, { height: width }, containerStyle]}>
      <View style={[styles.divider, { height: width }]} />
      {children
        ? (
          <>
            <View>
              <Subheading style={styles.text}>
                {children}
              </Subheading>
            </View>
            <View style={styles.divider} />
          </>
        ) : null}
    </View>
  );
}

export default Divider;
