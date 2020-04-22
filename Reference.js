import * as React from 'react'; 
import { Button, Image, View, Alert } from 'react-native'; 
import * as ImagePicker from 'expo-image-picker'; 
import * as Permissions from 'expo-permissions'; 
import * as firebase from 'firebase';


export default class LicenserUploader extends React.Component {
  state = { thumbnail: null, };

  render() 
  { let { thumbnail } = this.state; return (<View > <Button title="Upload Image" onPress={this.pushIt} /> 
  
  
  {thumbnail && <Image source={{ uri: thumbnail }} style={{ width: 200, height: 200 }} />} 
  
  </View>); }

  componentDidMount() 
  { this.getPermissionAsync(); }
  getPermissionAsync = async () => { // alert('fired getPermission') await Permissions.askAsync(Permissions.CAMERA_ROLL); await Permissions.askAsync(Permissions.CAMERA); }
    pushIt = async () => { // let result = await ImagePicker.launchCameraAsync(); let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) { this.uploadImage(result.uri, "test-image").then(() => { Alert.alert("Successfully Uploaded to the Hovrtek Database!"); }).catch((error) => { Alert.alert(error); }); this.setState({ thumbnail: result.uri }); }
    }
    uploadImage = async (uri, imageName) => {
      const response = await fetch(uri); const blob = await response.blob(); console.log("---------------------", blob)
      var ref = firebase.storage().ref().child("images/" + imageName); return ref.put(blob);
    }
  }



  ++++++++++++++++++++++++++++++++++++++++++++++

  // PilotProfileScreen FUNCTIONAL COMPONENT


import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Button, ScrollView, TextInput, FlatList } from "react-native";
import { AuthContext } from "../../context";
import ProfileImageUploader from '../../components/pilot/ProfileImageUploader';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getProfiles, postProfiles } from "../../actions/index";
import * as firebase from 'firebase';
import _ from "lodash";

const PilotProfileScreen = (props, { postProfiles, getProfiles }) => {

  useEffect(() => {
    props.getProfiles()
  }, []);


  // GRAB CURRENT USER PROPS BY MATCHING UID FROM FIREBASE WITH UID FROM USER OBJECT

  let user = firebase.auth().currentUser;
  console.log("USER", user)
  let userID = user.uid
  console.log("USERID", userID)
  console.log("LIST OF PROFILES", props.listOfProfiles)
  let currentUserProps = props.listOfProfiles.find(x => x.userID == userID)
  console.log('CURRENT USER PROPS', currentUserProps)

  // async function getLocation() {
  //   await let currentUserProps = props.listOfProfiles.find(x => x.userID == userID)
  //   return currentUserProps
  // }

  // STATE
  const { signOut } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [drone, setDrone] = useState('');
  const [pilotLocation, setPilotLocation] = useState(null);

  // HANDLE INPUT TEXT
  function handleDroneChange(text) {
    setDrone(text);
  }

  // SUBMITTING NEW PROFILE DATA
  const submit = e => {
    e.preventDefault();
    props.postProfiles(null, null, null, drone);
    navigation.navigate("ProfileListScreen");
    setDrone("");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>Welcome to your Profile Page</Text>
        <Text style={styles.h2}>Please complete your profile to recieve job postings</Text>



        {currentUserProps ? (<Text>{currentUserProps.pilotLocation}</Text>) : <Text>Location:</Text>}

        <Text style={styles.h1}>Please Upload a picture</Text>
        <ProfileImageUploader />

        <Text style={styles.h1}>What Type of Drone do you have? </Text>
        <TextInput
          multiline={true}
          numberOfLines={4}
          style={styles.input}
          placeholder="Drone"
          onChangeText={handleDroneChange}
          value={drone}
        />


        <TouchableOpacity onPress={submit}><Text style={styles.submitButton}>Submit Form</Text></TouchableOpacity>

        <Button title="Sign Out" onPress={() => signOut()} />

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

export default connect(mapStateToProps, { getProfiles, postProfiles })(PilotProfileScreen);
