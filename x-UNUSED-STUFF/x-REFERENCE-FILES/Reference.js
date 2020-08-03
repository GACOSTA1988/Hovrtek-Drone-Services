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
      const response = await fetch(uri); const blob = await response.blob(); blob)
      var ref = firebase.storage().ref().child("images/" + imageName); return ref.put(blob);
    }
  }



  ++++++++++++++++++++++++++++++++++++++++++++++

  // PilotProfileScreen FUNCTIONAL COMPONENT


import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Button, ScrollView, TextInput, FlatList } from "react-native";
import { AuthContext } from "../../App";
import ProfileImageUploader from '../../components/pilot/ProfileImageUploader';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getClientProfiles, postClientProfiles } from "../../clientProfiles/index";
import * as firebase from 'firebase';
import _ from "lodash";

const PilotProfileScreen = (props, { postClientProfiles, getClientProfiles }) => {

  useEffect(() => {
    props.getClientProfiles()
  }, []);


  // GRAB CURRENT USER PROPS BY MATCHING UID FROM FIREBASE WITH UID FROM USER OBJECT

  let user = firebase.auth().currentUser;

  let userID = user.uid

  let currentUserProps = props.listOfProfiles.find(x => x.userID == userID)


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
    props.postClientProfiles(null, null, null, drone);
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

        <Button title="Sign Out" onPress={signOut} />

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




-----------------------------------------------------------

import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
  ScrollView,
  Alert
} from "react-native";
import { AuthContext } from "../../App";
import * as firebase from "firebase";
import { connect } from "react-redux";


import AirDrop from "../../components/pilot/AirMapDropDown";

import { useNavigation } from '@react-navigation/native';
import PilotProfileUploader from "../../components/auth/PilotProfileUploader";




function PilotSignUpScreen(props) {
  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);
  const [pilotFirstName, setPilotFirstName] = useState("");
  const [pilotLastName, setPilotLastName] = useState("");
  const [pilotLocation, setPilotLocation] = useState("");
  const [droneType, setDroneType] = useState("");
  const [airMap, setAirMap] = useState("No");
  const [fourHundred, setFourHundred] = useState("No");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function signUp(e) {
    e.preventDefault();
    props.navigation.push("Loading");
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {

    }
    let user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: pilotFirstName,
      photoURL: "P",
    });
    await user.reload().then(updateUser());
    const userID = user.uid;
    props.postProfiles(
      pilotFirstName,
      pilotLastName,
      pilotLocation,
      droneType,
      airMap,
      fourHundred,
      userID
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textMain}>Create your pilot account</Text>
        <TouchableOpacity style={styles.textWrapper}>
          <TextInput
            placeholder="First Name"
            value={pilotFirstName}
            onChangeText={setPilotFirstName}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Last Name"
            value={pilotLastName}
            onChangeText={setPilotLastName}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Location"
            value={pilotLocation}
            onChangeText={setPilotLocation}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <TextInput
            placeholder="Drone Type"
            value={droneType}
            onChangeText={setDroneType}
            style={styles.input}
            placeholderTextColor="grey"
          />
          <Text style={styles.textSub}>
            Have you ever used{"\n"}AirMap or Kitty Hawk?
          </Text>
          {/* <AirDrop /> */}
          <Picker
            style={styles.airMapPicker}
            selectedValue={airMap}
            onValueChange={(itemValue, itemIndex) => setAirMap(itemValue)}
          >
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>

          <Text style={styles.textSub}>
            Do you have experience flying over 400 feet?
          </Text>
          <Picker
            style={styles.fourHundredPicker}
            selectedValue={fourHundred}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => setFourHundred(itemValue)}
          >
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>


          <Text style={styles.imageUploaderText}>Please upload your FAA license</Text>
          <PilotProfileUploader />



          <Button title="Sign up" onPress={signUp} />

          <Text style={styles.dummyText}>dummy text</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
    // justifyContent: 'center'
  },
  textMain: {
    marginTop: "25%",
    marginBottom: "5%",
    fontSize: 30,
    color: "#161616",
    fontWeight: "600",
    textAlign: "center",
  },
  textSub: {
    marginTop: "25%",
    // marginBottom: "5%",
    fontSize: 20,
    color: "white",
    fontWeight: "400",
    textAlign: "center",
  },
  textWrapper: {
    marginBottom: 20,
    alignItems: "center",
    // elevation: 8,
    borderRadius: 15,
    backgroundColor: "#161616",
    marginBottom: 15,
    padding: 80,
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 2,
    margin: 10,
    width: 200,
    alignItems: "center",
    textAlign: "center",
    color: "white",
    fontSize: 15,
  },
  dummyText: {
    marginTop: 200
  },

  airMapPicker: {
    height: 100,
    width: 100,
    color: "white",

    // marginBottom: 100,
  },
  airMapQuestionText: {
    // marginTop: 100,
  },

  imageUploaderText: {
    marginTop: 250
  }

});

export default connect(null, { postProfiles })(PilotSignUpScreen);

export default connect(mapStateToProps, { getClientProfiles, postClientProfiles })(PilotProfileScreen);
