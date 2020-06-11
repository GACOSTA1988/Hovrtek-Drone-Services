import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { editProject } from "../../actions/projects";
import { connect } from "react-redux";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

function EditProjectScreen(props, { editProject }) {
  const projectDetails = props.route.params;
  const navigation = useNavigation();

  const [ location, setLocation ] = useState(projectDetails.location);
  const [ date, setDate ] = useState(projectDetails.date);
  const [ recording, setRecording ] = useState(projectDetails.recording);

  const submit = (e) => {
    projectDetails.location = location;
    projectDetails.date = date;
    projectDetails.recording = recording;
    props.editProject(location, date, recording, projectDetails.key);
    navigation.navigate("ProjectDetailsScreen", {
      ...projectDetails
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.saveButton}>
        <TouchableOpacity hitSlop={styles.hitSlop} onPress={submit}>
          <Text style={styles.saveText}>Save changes</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.ProjectText}>Edit Details</Text>
      <View style={styles.line} />
      <Text style={styles.detailsHeader}>Where</Text>
      <TextInput
        style={styles.DetailsText}
        onChangeText={setLocation}
        value={location}
      />
      <Text style={styles.detailsHeader}>When</Text>
      <TextInput
        style={styles.DetailsText}
        onChangeText={setDate}
        value={date}
      />
      <Text style={styles.detailsHeader}>What</Text>
      <TextInput
        style={styles.DetailsText}
        onChangeText={setRecording}
        value={recording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  KeyboardAwareScrollView: {
    flex: 1,
    height: "120%",
  },
  editProjectCard: {
    borderRadius: 15,
    backgroundColor: "#092455",
    marginBottom: 15,
    padding: 20,
  },
  editProjectText: {
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  submitButtonWrapper: {
    alignItems: "center",
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
  },
  backButtonWrapper: {
    alignItems: "center",
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3E90D0",
    marginBottom: 20,
    marginTop: 10,
    zIndex: 0
  },
  DetailsText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    fontWeight: "800",
  },
  line: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hitSlop: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  saveButton: {
    position: "absolute",
    right: "6%",
    top: "8%",
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
    zIndex: 1
  },
});

export default connect(null, { editProject })(EditProjectScreen);
