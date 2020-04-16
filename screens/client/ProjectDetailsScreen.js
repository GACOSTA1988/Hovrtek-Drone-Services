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
        <Text>🕺DETAILS BELOW🕺</Text>

        <Text>Project location: {this.state.location}</Text>
        <Text>Project Date: {this.state.date}</Text>
        <Text>Project Recording: {this.state.recording}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff"
  }
});

export default ProjectDetailsScreen;
