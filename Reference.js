import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { postProjects } from "../../actions/index";
import { connect } from "react-redux";

class NewProjectScreen extends Component {
  state = {
    date: "",
    location: "",
    recording: ""
  };
  submit = () => {
    this.props.postProjects(this.state.date, this.state.location, this.state.recording);
    this.setState({
      date: "",
      location: "",
      recording: ""
    });
    this.props.navigation.navigate("ProjectListScreen");
  };

  render() {
    return (
      <View style={styles.newProjectListWrapper}>
        <TouchableOpacity style={styles.newProjectListTextWrapper}>
          <Text style={styles.newProjectText}>Create a New Project</Text>
          <TextInput
           style={styles.input}
            placeholder="Date"
            onChangeText={date => this.setState({ date })}
            value={this.state.date}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder="What will your Drone Services be recording?"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          />
          <Button title="Submit" onPress={this.submit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center"
  },
  newProjectListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  newProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
  },
  newProjectListTextWrapper: {
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 5
  
  }
});

export default connect(null, { postProjects })(NewProjectScreen);
