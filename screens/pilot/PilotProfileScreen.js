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


  let user = firebase.auth().currentUser;
  console.log("USER", user)
  let userID = user.uid
  console.log("USERID", userID)
  console.log("LIST OF PROFILES", props.listOfProfiles)
  const list = props.listOfProfiles
  // list.forEach(e=> console.log(e))
    let currentUserProps = list.find(x => x.userID === userID)

  console.log('CURRENT USER PROPS', currentUserProps)
  console.log("PILOT PROFILE PROPS", props)
  console.log("LIST OF PROFILES", props.listOfProfiles)


  function handleDroneChange(text) {
    setDrone(text);
  }


  const editProfile= e => {
    e.preventDefault();
    navigation.navigate("ProfileListScreen");
    setDrone("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>Welcome to your Profile Page, {currentUserProps ? (<Text>{currentUserProps.pilotFirstName} {currentUserProps.pilotLastName}</Text>) : <Text>Name:</Text>}</Text>

        {currentUserProps ? (<Text style={styles.h2}>Location: {currentUserProps.pilotLocation}</Text>) : <Text style={styles.h2}>Location:</Text>}


        {currentUserProps ? (<Text style={styles.h2}>What type of drone do you fly? {currentUserProps.droneType}</Text>) : <Text style={styles.h2}>Location:</Text>}

        {currentUserProps ? (<Text style={styles.h2}>Do you have experience with AirMap or Kitty Hawk? {currentUserProps.airMap}</Text>) : <Text style={styles.h2}>Do you have experience with AirMap or Kitty Hawk?</Text>}

        {currentUserProps ? (<Text style={styles.h2}>Do you have experience flying over 400 feet? {currentUserProps.airMap}</Text>) : <Text style={styles.h2}>Do you have experience flying over 400 feet?</Text>}
        



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
  console.log("this is state", state);
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
