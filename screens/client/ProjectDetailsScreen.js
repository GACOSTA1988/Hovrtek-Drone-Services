import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";

class ProjectDetailsScreen extends Component {
  state = {
    location: this.props.route.params.location,
    date: this.props.route.params.date,
    recording: this.props.route.params.recording,
    key: this.props.route.params.key
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.ProjectText}>Project Details</Text>

        <Text style={styles.DetailsText}>
          Project location: {this.state.location}
        </Text>
        <Text style={styles.DetailsText}>Project Date: {this.state.date}</Text>
        <Text style={styles.DetailsText}>
          Project Recording: {this.state.recording}
        </Text>
      </View>
    );
  }
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
