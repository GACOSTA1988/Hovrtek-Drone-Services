import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';

const Job = () => {

  return (
    <View style={styles.jobWrapper}>
      <Text style={styles.jobText}>
        This is a job
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  jobWrapper: {
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  jobText: {
    fontSize: 30
  }

});

export default Job;
