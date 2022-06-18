import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { typography } from '../styles';

export interface IDivider{
  children?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  divider: { flex: 1, height: 1, backgroundColor: '#ccc' },
  text: { width: 50, textAlign: 'center' },
});

function Divider({ children }: IDivider) {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      {children
        ? (
          <>
            <View>
              <Text style={[typography.secondaryHeading, styles.text]}>
                {children}
              </Text>
            </View>
            <View style={styles.divider} />
          </>
        ) : null}
    </View>
  );
}

export default Divider;
