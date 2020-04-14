import React, { useState } from "react";
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
// import firebase from '../../firebase';

// make sure to read in both props and postProfiles function
function CreateProfileScreen(props, {postProfiles}) {

  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [equipment, setEquipment] = useState('');
  const [availability, setAvailability] = useState('');

  function handleNameChange(text) {
    setName(text);
  }

  function handleOverviewChange(text) {
    setOverview(text);
  }

  function handleEquipmentChange(text) {
    setEquipment(text);
  }

  function handleAvailabilityChange(text) {
    setAvailability(text);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log("createprofilescreen line 38. this is props: ", props);
    props.postProfiles(name, overview, equipment, availability);
  }

  return (
    <View style={styles.createProfileWrapper}>
      <TouchableOpacity style={styles.createProfileTextWrapper}>
        <Text style={styles.createProfileText}>Edit your profile</Text>
        <TextInput
          placeholder="name"
          onChangeText={handleNameChange}
          value={name}
        />
        <TextInput
          placeholder="overview"
          onChangeText={handleOverviewChange}
          value={overview}
        />
        <TextInput
          placeholder="equipment"
          onChangeText={handleEquipmentChange}
          value={equipment}
        />
        <TextInput
          placeholder="availability"
          onChangeText={handleAvailabilityChange}
          value={availability}
        />
        <Button title="Save Changes" onPress={submit} />
      </TouchableOpacity>
    </View>
  );
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
