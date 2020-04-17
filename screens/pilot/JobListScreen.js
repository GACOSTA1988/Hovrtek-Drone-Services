import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

const JobListScreen = () => {
  return (
    <View style={styles.jobListWrapper}>
      <TouchableOpacity style={styles.PilotJobListTextWrapper}>
        <Text style={styles.pilotText}>Current Jobs</Text>
      </TouchableOpacity>

      <View style={styles.jobCard}>
        <TouchableOpacity>
          <Text> This is a Job. </Text>
          <Text> When: April 20th, 2020 </Text>
          <Text> Notes: I want a drone to spy on my neighbor </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  jobCard: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  pilotText: {
    fontSize: 30,
    color: "darkblue"
  },
  PilotJobListTextWrapper: {
    marginBottom: 20
  },
  jobListWrapper: {
    alignItems: "center"
  }
});

export default JobListScreen;
