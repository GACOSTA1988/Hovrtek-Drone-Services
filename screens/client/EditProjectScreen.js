import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { editProject } from "../../actions/index";
import { connect } from "react-redux";

function EditProjectScreen(props, { editProject }) {
  const projectDetails = props.route.params;
  const navigation = useNavigation();

  const [location, setLocation] = useState(projectDetails.location);
  const [date, setDate] = useState(projectDetails.date);
  const [recording, setRecording] = useState(projectDetails.recording);

  const submit = (e) => {
    props.editProject(location, date, recording, projectDetails.key);
    navigation.navigate("ProjectListScreen");
  }

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
        onChangeText={setLocation}
        value={location}
      />
      <TextInput
        style={{
          marginTop: 20,
          height: 90,
          borderColor: "gray",
          borderWidth: 1
        }}
        placeholder="date"
        onChangeText={setDate}
        value={date}
      />
      <TextInput
        style={{
          marginTop: 20,
          height: 90,
          borderColor: "gray",
          borderWidth: 1
        }}
        placeholder="recording"
        onChangeText={setRecording}
        value={recording}
      />
      <Button title="Submit" onPress={submit} />
    </View>
  );
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
