import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

function ProjectDetailsScreen(props) {
  const projectDetails = props.route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.ProjectText}>Project Details</Text>
      <Text style={styles.DetailsText}>
        Project location: {projectDetails.location}
      </Text>
      <Text style={styles.DetailsText}>Project Date: {projectDetails.date}</Text>
      <Text style={styles.DetailsText}>
        Project Recording: {projectDetails.recording}
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

export default ProjectDetailsScreen;
