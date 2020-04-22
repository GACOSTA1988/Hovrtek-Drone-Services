import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { connect } from "react-redux";

function JobDetailsScreen(props) {
  const jobDetails = props.route.params;
  return(
    <View style={styles.container}>
      <Text style={styles.ProjectText}>Project Details</Text>

      <Text style={styles.DetailsText}>
        Project location: {jobDetails.location}
      </Text>
      <Text style={styles.DetailsText}>Project Date: {jobDetails.date}</Text>
      <Text style={styles.DetailsText}>
        Project Recording: {jobDetails.recording}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20
  },

  ProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10
  },

  DetailsText: {
    marginBottom: 50,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800"
  }
});

export default JobDetailsScreen;
