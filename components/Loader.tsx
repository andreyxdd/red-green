import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
}

export default Loader;
