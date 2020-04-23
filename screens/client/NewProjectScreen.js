//NEWPROJECTSCREEN
import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { postProjects } from "../../actions/index";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { postClientProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../../components/client/ImageUploader";
import * as firebase from "firebase";

function NewProjectScreen(props, { postProjects }) {
  const navigation = useNavigation();
  let clientID = null;
  if (firebase.auth().currentUser) {
    clientID = firebase.auth().currentUser.uid;
  }
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [recording, setRecording] = useState("");
  const [light, setLight] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    props.postProjects(clientID, location, date, recording, light, null);
    navigation.navigate("ProjectListScreen");
    setDate(""), setLight(""), setLocation(""), setRecording("");
  };

  // RADIO BUTTON STUFF

  let radio_props = [
    { label: "Yes", value: 0 },
    { label: "No", value: 1 },
  ];

  return (
    <View style={styles.newProjectListWrapper}>
      <ScrollView>
        <TouchableOpacity style={styles.newProjectListTextWrapper}>
          <Text style={styles.newProjectText}>Create a New Project</Text>
          <Text style={styles.labelText}>
            Where is the location you want your Drone Service?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Location"
            onChangeText={setLocation}
            value={location}
          />
          <Text style={styles.labelText}>
            What is the date of your Drone shoot?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Date"
            onChangeText={setDate}
            value={date}
          />
          <Text style={styles.labelText}>
            What will the Drone Service be recording?
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            style={styles.input}
            placeholder="What?"
            onChangeText={setRecording}
            value={recording}
          />
          <Text style={styles.labelText}>
            Do you have any light specification?
          </Text>
          <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            buttonColor={"#092455"}
            selectedButtonColor={"#092455"}
            radio_props={radio_props}
            initial={1}
            onPress={setLight}
          />
          {/* <Text style={styles.uploaderText}>Upload an Image Here!</Text>
          <ImageUploader style={styles.uploaderObject} /> */}

          <TouchableOpacity onPress={submit}>
            <Text style={styles.submitButton}>Submit Form</Text>
          </TouchableOpacity>
          {/* <Button style={styles.submitButton} title="Submit" onPress={submit} /> */}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  newProjectListWrapper: {
    alignItems: "center",
  },
  newProjectListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6,
  },
  newProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10,
  },
  newProjectListTextWrapper: {
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,

    marginBottom: 50,
  },
  imageButton: {
    height: 30,
    width: 20,
    marginBottom: 1000,
    backgroundColor: "red",
  },
  labelText: {
    marginBottom: 50,
    textAlign: "center",
  },
  uploaderText: {
    marginTop: 100,
  },
  dummy: {
    marginTop: 100,
    marginBottom: 200,
  },
  submitButton: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#092455",
  },
});

export default connect(null, { postProjects })(NewProjectScreen);
