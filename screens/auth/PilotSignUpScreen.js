import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
  ScrollView
} from "react-native";
import { AuthContext } from "../../context";
import * as firebase from "firebase";
import { postProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import LicenseUploader from "../../components/auth/LicenseUploader";



function PilotSignUpScreen(props) {

  const navigation = useNavigation();
  const { updateUser } = useContext(AuthContext);
  const [pilotFirstName, setPilotFirstName] = useState('');
  const [pilotLastName, setPilotLastName] = useState('');
  const [pilotLocation, setPilotLocation] = useState('');
  const [droneType, setDroneType] = useState('');
  const [airMap, setAirMap] = useState("No");
  const [fourHundred, setFourHundred] = useState("No");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function signUp(e) {
    e.preventDefault();
    props.navigation.push("Loading");
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error.toString(error));
    }
    let user = firebase.auth().currentUser;
    await user.updateProfile({
      displayName: pilotFirstName,
      photoURL: 'P'
    });
    await user.reload().then(updateUser());
    const userID = user.uid;
    props.postProfiles(pilotFirstName, pilotLastName, pilotLocation, droneType, airMap, fourHundred, userID);
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity style={styles.textWrapper}>
          <Text style={styles.text}>Create your pilot account</Text>
          <TextInput
            placeholder="First Name"
            value={pilotFirstName}
            onChangeText={setPilotFirstName}
            style={styles.input}
          />
          <TextInput
            placeholder="Last Name"
            value={pilotLastName}
            onChangeText={setPilotLastName}
            style={styles.input}
          />
          <TextInput
            placeholder="Location"
            value={pilotLocation}
            onChangeText={setPilotLocation}
            style={styles.input}
          />
          <TextInput
            placeholder="Drone Type"
            value={droneType}
            onChangeText={setDroneType}
            style={styles.input}
          />

          <Text style={styles.airMapQuestionText}>Have you ever used AirMap or Kitty Hawk?</Text>
          <Picker
            style={styles.airMapPicker}
            selectedValue={airMap}
            onValueChange={(itemValue, itemIndex) => setAirMap(itemValue)}>
            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>

          <Text style={styles.questionText}>Do you have experience flying over 400 feet?</Text>
          <Picker
            style={styles.fourHundredPicker}
            selectedValue={fourHundred}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) => setFourHundred(itemValue)}>

            <Picker.Item label="No" value="no" />
            <Picker.Item label="Yes" value="yes" />
          </Picker>

          <Text style={styles.imageUploaderText}>Please upload your FAA license</Text>
          <LicenseUploader/>
     


          <TextInput
            placeholder="email"
            value={email}
            onChangeText={setEmail}
            style={styles.emailInput}
          />
          <TextInput
            placeholder="password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />


          <Button title="Sign up" onPress={signUp} />

          <Text style={styles.dummyText}>Dummy text untill I investigate scrollview more thoroughly</Text>

        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    alignItems: "center",
    justifyContent: 'center'

  },
  text: {
    fontSize: 30,
    color: "darkblue"
  },
  textWrapper: {
    marginBottom: 20
  },
  input: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 60,
    width: 200
  },
  emailInput: {
    height: 40,
    borderColor: "grey",
    borderWidth: 1,
    marginTop: 200,
    width: 200
  },
  dummyText: {
    marginTop: 300
  },
  airMapPicker: {
    height: 100,
    width: 100,
    marginBottom: 100
  },
  airMapQuestionText: {
    marginTop: 100,

  },
  fourHundredQuestionText: {

  },
  questionText: {
    marginTop: 50
  },
  imageUploaderText:{
    marginTop: 250
  }
});

export default connect(null, { postProfiles })(PilotSignUpScreen);
