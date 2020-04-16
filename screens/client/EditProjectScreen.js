import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { editProject } from "../../actions/index";
import { connect } from "react-redux";

class EditProjectScreen extends Component {
  state = {
    location: this.props.route.params.location,
    date: this.props.route.params.date,
    recording: this.props.route.params.recording,
    key: this.props.route.params.key
  };

  submit = () => {
    this.props.editProject(
      this.state.location,
      this.state.date,
      this.state.recording,
      this.state.key
    );

    this.setState({
      location: "",
      date: "",
      recording: "",
      key: ""
    });

    this.props.navigation.navigate("ProjectListScreen");
  };

  render() {
    console.log("00000000000000000", this.props.route.params.location);
    return (
      <View style={styles.container}>
        <Text>Post</Text>
        <TextInput
          style={{
            marginTop: 20,
            height: 40,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="location"
          onChangeText={location => this.setState({ location })}
          value={this.state.location}
        />
        <TextInput
          style={{
            marginTop: 20,
            height: 90,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="date"
          onChangeText={date => this.setState({ date })}
          value={this.state.date}
        />
        <TextInput
          style={{
            marginTop: 20,
            height: 90,
            borderColor: "gray",
            borderWidth: 1
          }}
          placeholder="recording"
          onChangeText={recording => this.setState({ recording })}
          value={this.state.recording}
        />
        <Button title="Submit" onPress={this.submit} />
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

export default connect(null, { editProject })(EditProjectScreen);
