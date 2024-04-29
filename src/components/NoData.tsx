import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const NoData = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textNoData}>No Data</Text>
      <Text style={styles.textNoData}>Pull to Refresh</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '70%',
  },
  textNoData: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
  },
});
