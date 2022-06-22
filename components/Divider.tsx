import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Subheading } from 'react-native-paper';

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
