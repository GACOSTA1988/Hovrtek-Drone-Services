import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import Job from './Job';

const Jobs = () => {

  return (
    <View style={styles.jobsWrapper}>
      <Text style={styles.jobsText}>
        This is the jobs component
      </Text>
      <Job />
    </View>
  )
}

const styles = StyleSheet.create({
  jobsWrapper: {
    flex: 0,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  jobsText: {
    fontSize: 30
  }

});

export default Jobs;
