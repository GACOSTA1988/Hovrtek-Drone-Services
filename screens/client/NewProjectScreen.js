import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";
import { postProjects } from "../../actions/index";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { postProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';

function NewProjectScreen(props, {postProjects}) {

  const navigation = useNavigation();


  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [recording, setRecording] = useState('');
  const [light, setLight] = useState(1);

  function handleLocationChange(text) {
    setLocation(text);
  }

  function handleDateChange(text) {
    setDate(text);
  }

  function handleRecordingChange(text) {
    setRecording(text);
  }

  function handleLightChange(text) {
    (value) => { setLight({ value: value }) }
  }

  const submit = (e) => {
    e.preventDefault();
    console.log("New Project Props", props);
    props.postProjects(location, date, recording, light);
    navigation.navigate("ProjectListScreen")
  }

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
            onChangeText={handleLocationChange}
            value={location}
          />
          <TextInput
           style={styles.input}
            placeholder="Date"
            onChangeText={handleDateChange}
            value={date}
          />
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder="What will your Drone Services be recording?"
            onChangeText={handleRecordingChange}
            value={recording}
          />
          <Text>Do you have any light specification?</Text>
          <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={'#092455'}
            selectedButtonColor={'#092455'}
            radio_props={radio_props}
            initial={1}
            onPress={handleLightChange}
          />
          <Button title="Submit" onPress={submit} />
        </TouchableOpacity>
      </View>
    );
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
