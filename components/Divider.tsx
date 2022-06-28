import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

export interface IDivider{
  children?: React.ReactNode;
  containerStyle?: any;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  divider: { flex: 1, height: 2, backgroundColor: '#ccc' },
  text: { width: 50, textAlign: 'center' },
});

function Divider({ children, containerStyle }: IDivider) {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.divider} />
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
