import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Button, ScrollView, TextInput } from "react-native";
import ProfileImageUploader from '../../components/pilot/ProfileImageUploader';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getPilotProfiles } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";

function PilotProfileScreen(props, { getPilotProfiles }) {

  const navigation = useNavigation();
  const [drone, setDrone] = useState('');

  useEffect(() => {
    props.getPilotProfiles();
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

  const editProfile= e => {
    e.preventDefault();
    navigation.navigate("ProfileListScreen");
    setDrone("");
  };

  return (
    <View style={styles.container}>
    
        <View style={styles.welcomeWrapper}>
        <Text style={styles.welcomeText}>Welcome to your Profile Page, {currentUserProps ? (<Text>{currentUserProps.pilotFirstName} {currentUserProps.pilotLastName}</Text>) : <Text>Name:</Text>}</Text>
      </View>
        <View style={styles.profileDetails}>
        {currentUserProps ? (<Text style={styles.h2}>Location: {currentUserProps.pilotLocation}</Text>) : <Text style={styles.h2}>Location:</Text>}

        {currentUserProps ? (<Text style={styles.h2}>What type of drone do you fly? {currentUserProps.droneType}</Text>) : <Text style={styles.h2}>Location:</Text>}

        {currentUserProps ? (<Text style={styles.h2}>Do you have experience with AirMap or Kitty Hawk? {currentUserProps.airMap}</Text>) : <Text style={styles.h2}>Do you have experience with AirMap or Kitty Hawk?</Text>}

        {currentUserProps ? (<Text style={styles.h2}>Do you have experience flying over 400 feet? {currentUserProps.airMap}</Text>) : <Text style={styles.h2}>Do you have experience flying over 400 feet?</Text>}
        </View>



        <TouchableOpacity onPress={editProfile}><Text style={styles.submitButton}>Edit Profile</Text></TouchableOpacity>

        <Text style={styles.dummyText}>Dummy text until I investigate ScrollView more thoroughly</Text>
  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 80
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
    marginTop: 5,
    color: 'white'
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80
  },
  dummyText: {
    marginTop: 300
  },
  profileDetails: {
    backgroundColor: '#092455',
    width: "80%"
  },
  welcomeWrapper:{
    marginBottom: 50
  }

});


function mapStateToProps(state) {
  const listOfProfiles = _.map(state.pilotProfilesList.pilotProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfProfiles
  };
}

export default connect(mapStateToProps, { getPilotProfiles })(
  PilotProfileScreen
);
