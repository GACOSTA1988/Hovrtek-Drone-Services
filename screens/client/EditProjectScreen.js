import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { editProject } from "../../actions/projects";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function EditProjectScreen(props, { editProject }) {
  const projectDetails = props.route.params;
  const navigation = useNavigation();

  const [location, setLocation] = useState(projectDetails.location);
  const [date, setDate] = useState(projectDetails.date);
  const [recording, setRecording] = useState(projectDetails.recording);

  const submit = (e) => {
    props.editProject(location, date, recording, projectDetails.key);
    navigation.navigate("ProjectListScreen");
  };

  return (
    <KeyboardAwareScrollView style={styles.KeyboardAwareScrollView}>

      <View style={styles.container}>
        <View style={styles.editProjectCard}>
          <Text style={styles.editProjectText}>
            Edit Project
            {"\n"}
          </Text>
          <Text style={styles.labelText}>
            Location
          </Text>
          <TextInput style={styles.input}
            placeholderTextColor="white"
            placeholder="location"
            onChangeText={setLocation}
            value={location}
          />
          <Text style={styles.labelText}>
            {"\n"}
            Date
          </Text>
          <TextInput style={styles.input}
            placeholderTextColor="white"
            placeholder="date"
            onChangeText={setDate}
            value={date}
          />
          <Text style={styles.labelText}>
            {"\n"}
            Project Description
          </Text>
          <TextInput style={styles.input}
            placeholder="recording"
            onChangeText={setRecording}
            value={recording}
          />
        </View>
        {/* <Button title="Save Changes" onPress={submit} /> */}

        <View style={styles.submitButtonWrapper}>
          <TouchableOpacity style={styles.submitButton} onPress={submit}>
            <Text style={styles.submitButtonText}>Submit Update</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.backButtonWrapper}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* <Button title="Back" onPress={() => props.navigation.goBack()} /> */}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "lightgray",
    height: "100%",
  },
  KeyboardAwareScrollView: {
    flex: 1,
    height: "120%",
    backgroundColor: "lightgray",
  },
  editProjectCard: {
    // elevation: 8,
    borderRadius: 15,
    backgroundColor: "#092455",
    marginBottom: 15,
    padding: 20,
  },
  editProjectText:{
    fontSize: 30,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },
  labelText: {
    fontSize: 20,
    color: "white",
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    marginTop: 10,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 2,
    color: "white",
  },
  submitButton: {
    width: 220,
    height: 60,
    borderWidth: 2,
    borderColor: "#092455",
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  submitButtonWrapper: {
    alignItems: 'center'
  },
  submitButtonText: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 30,
    color: "#092455",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    width: 60,
    height: 30,
    backgroundColor: "#092455",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    // marginBottom: 40,
  },
  backButtonWrapper: {
    alignItems: 'center'
  },



});

export default connect(null, { editProject })(EditProjectScreen);
