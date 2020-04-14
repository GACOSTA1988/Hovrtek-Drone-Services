import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { postProfiles } from "../../actions/index";
import { connect } from "react-redux";

class CreateProfileScreen extends Component {
  state = {
    name: "",
    overview: "",
    equipment: "",
    availability: ""
  };
  submit = () => {
    this.props.postProfiles(this.state.name, this.state.overview, this.state.equipment, this.state.availability);
    this.setState({
      name: "",
      overview: "",
      equipment: "",
      availability: ""
    });
    this.props.navigation.navigate("ProfileListScreen");
  };

  render() {
    return (
      <View style={styles.createProfileWrapper}>
        <TouchableOpacity style={styles.createProfileTextWrapper}>
          <Text style={styles.createProfileText}>Edit your profile</Text>
          <TextInput
            placeholder="name"
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
          />
          <TextInput
            placeholder="overview"
            onChangeText={overview => this.setState({ overview })}
            value={this.state.overview}
          />
          <TextInput
            placeholder="equipment"
            onChangeText={equipment => this.setState({ equipment })}
            value={this.state.equipment}
          />
          <TextInput
            placeholder="availability"
            onChangeText={availability => this.setState({ availability })}
            value={this.state.availability}
          />
          <Button title="Submit" onPress={this.submit} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  createProfileWrapper: {
    alignItems: "center"
  },
  createProfileForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  createProfileText: {
    fontSize: 30,
    color: "darkblue"
  },
  createProfileTextWrapper: {
    marginBottom: 20
  }
});

export default connect(null, { postProfiles })(CreateProfileScreen);
