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
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

//BUTTON FUNCTIONALITY
// let radio_props = [
//   { label: 'Yes', value: 0 },
//   { label: 'No', value: 1 }
// ];



class NewProjectScreen extends Component {
  state = {
    location: "",
    date: "",
    recording: "",
    light: 1
  };

  submit = () => {
    this.props.postProjects(this.state.date, this.state.location, this.state.recording, this.state.light);
    this.setState({
      date: "",
      location: "",
      recording: "",
      light: 1
    });
    this.props.navigation.navigate("ProjectListScreen");
  };


  render() {
console.log(this.state);

    // RADIO BUTTON STUFF
    
    let radio_props = [
      { label: 'Yes', value: 0 },
      { label: 'No', value: 1 }
    ];

    
    return (
      <View style={styles.newProjectListWrapper}>
        <TouchableOpacity style={styles.newProjectListTextWrapper}>
          <Text style={styles.newProjectText}>Create a New Project</Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={location => this.setState({ location })}
            value={this.state.location}
          />
          <TextInput
           style={styles.input}
            placeholder="Date"
            onChangeText={date => this.setState({ date })}
            value={this.state.date}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder="What will your Drone Services be recording?"
            onChangeText={recording => this.setState({ recording })}
            value={this.state.recording}
          />
          <Text>Do you have any light specification?</Text>
          <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#092455'}
            selectedButtonColor={'#092455'}
            radio_props={radio_props}
            initial={1}
            onPress={(value) => { this.setState({ value: value }) }}
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
