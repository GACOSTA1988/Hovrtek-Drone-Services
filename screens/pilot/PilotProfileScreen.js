import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import ProfileImageUploader from '../../components/pilot/ProfileImageUploader';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProfiles } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";

function PilotProfileScreen(props, { getProfiles }) {

  const navigation = useNavigation();
  const [drone, setDrone] = useState('');

  useEffect(() => {
    props.getProfiles();
  }, []);

  const editProfile= e => {
    e.preventDefault();
    navigation.navigate("ProfileListScreen");
    setDrone("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>Welcome to your Profile Page</Text>


        <Text style={styles.h2}>Please complete your profile to recieve job postings</Text>
        <Text style={styles.h1}>Name dynamically rendered here from login</Text>
        <Text style={styles.h1}>Location dynamically rendered here from login</Text>
        <Text style={styles.h1}>Please Upload a picture</Text>
        <ProfileImageUploader />

        <Text style={styles.h1}>What Type of Drone do you have? </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          placeholder="Drone"
          onChangeText={setDrone}
          value={drone}
        />


        <TouchableOpacity onPress={editProfile}><Text style={styles.submitButton}>Edit Profile</Text></TouchableOpacity>

        <Text style={styles.dummyText}>Dummy text until I investigate ScrollView more thoroughly</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 25
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  welcomeText: {
    fontSize: 25
  },
  h1: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 50
  },
  h2: {
    fontSize: 15,
    marginBottom: 20,
    marginTop: 5
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80
  },
  dummyText: {
    marginTop: 300
  }
});


function mapStateToProps(state) {
  const listOfProfiles = _.map(state.profilesList.profilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfProfiles
  };
}

export default connect(mapStateToProps, { getProfiles })(
  PilotProfileScreen
);
