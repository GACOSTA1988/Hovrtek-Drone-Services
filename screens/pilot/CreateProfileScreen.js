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

// make sure to read in both props and postProfiles function
function CreateProfileScreen(props, { postProfiles }) {

  const [name, setName] = useState('');
  const [overview, setOverview] = useState('');
  const [equipment, setEquipment] = useState('');
  const [availability, setAvailability] = useState('');

  const submit = (e) => {
    e.preventDefault();
    props.postProfiles(name, overview, equipment, availability);
  }

  return (
    <View style={styles.createProfileWrapper}>
      <TouchableOpacity style={styles.createProfileTextWrapper}>
        <Text style={styles.createProfileText}>Edit your profile</Text>
        <TextInput
          placeholder="name"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          placeholder="overview"
          onChangeText={setOverview}
          value={overview}
        />
        <TextInput
          placeholder="equipment"
          onChangeText={setEquipment}
          value={equipment}
        />
        <TextInput
          placeholder="availability"
          onChangeText={setAvailability}
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
