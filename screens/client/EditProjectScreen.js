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
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          elevation: 8,
          borderRadius: 15,
          backgroundColor: "#092455",
          marginBottom: 15,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: "white",
            fontWeight: "600",
            textAlign: "center",
          }}
        >
          Edit Project
          {"\n"}
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Location
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            height: 40,
            borderColor: "gray",
            borderWidth: 2,
            color: "white",
          }}
          placeholderTextColor="grey"
          placeholder="location"
          onChangeText={setLocation}
          value={location}
        />
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {"\n"}
          Date
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            height: 90,
            borderColor: "gray",
            borderWidth: 2,
            color: "white",
          }}
          placeholderTextColor="grey"
          placeholder="date"
          onChangeText={setDate}
          value={date}
        />
        <Text
          style={{
            fontSize: 20,
            color: "gray",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          {"\n"}
          Project Description
        </Text>
        <TextInput
          style={{
            marginTop: 10,
            height: 90,
            borderColor: "gray",
            borderWidth: 2,
            color: "white",
          }}
          placeholder="recording"
          onChangeText={setRecording}
          value={recording}
        />
      </View>
      <Button title="Save Changes" onPress={submit} />
      <Button title="Back" onPress={() => props.navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#fff",
  },
});

export default connect(null, { editProject })(EditProjectScreen);
