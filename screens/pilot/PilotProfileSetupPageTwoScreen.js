import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import ProfileImageUploader from "../../components/pilot/ProfileImageUploader";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getPilotProfiles } from "../../actions/index";
import { editPilotProfile } from "../../actions/index";
import * as firebase from "firebase";
import _ from "lodash";
import DatePicker from "../../components/DatePicker";

// context hook stuff
export const PassSetFaaLicenseContext = React.createContext();
export const PassFaaLicenseState = React.createContext();

function PilotProfileSetupPageTwoScreen(
  props,
  { getPilotProfiles, editPilotProfile }
) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);
  let user = firebase.auth().currentUser;
  let userID = user.uid;
  const list = props.listOfProfiles;
  let currentUserProps = list.find((x) => x.userID === userID);
  if (currentUserProps) {
  }
  let pilotLocationPlaceHolder = "";
  let personalBioPlaceHolder = "";
  let yearsOfExperiencePlaceHolder = "";
  let faaLicenseExpPlaceHolder = "";
  let insuredStatusPlaceHolder = "";
  let travelStatusPlaceHolder = "";
  let droneTypePlaceHolder = "";
  let airMapPlaceHolder = "";
  let fourHundredPlaceHolder = "";
  let profileCompletePlaceHolder = "";
  let profileImageUrlPlaceHolder = "";

  if (currentUserProps) {
    pilotLocationPlaceHolder = currentUserProps.pilotLocation;
    personalBioPlaceHolder = currentUserProps.personalBio;
    yearsOfExperiencePlaceHolder = currentUserProps.yearsOfExperience;
    faaLicenseExpPlaceHolder = currentUserProps.faaLicenseExp;
    insuredStatusPlaceHolder = currentUserProps.insuredStatus;
    travelStatusPlaceHolder = currentUserProps.travelStatus;
    droneTypePlaceHolder = currentUserProps.droneType;
    airMapPlaceHolder = currentUserProps.airMap;
    fourHundredPlaceHolder = currentUserProps.fourHundred;
    profileCompletePlaceHolder = currentUserProps.profileCompletePlaceHolder;
    profileImageUrlPlaceHolder = currentUserProps.profileImageUrl;
  }
  // Context Hook thing
  const [fakeDate, setFakeDate] = useState(null);

  const [profileImageUrl, setProfileImageUrl] = useState(
    profileImageUrlPlaceHolder
  );
  const [personalBio, setPersonalBio] = useState(personalBioPlaceHolder);
  const [yearsOfExperience, setYearsOfExperience] = useState(
    yearsOfExperiencePlaceHolder
  );
  const [faaLicenseExp, setFaaLicenseExp] = useState(faaLicenseExpPlaceHolder);
  const [insuredStatus, setInsuredStatus] = useState(insuredStatusPlaceHolder);
  const [travelStatus, setTravelStatus] = useState(travelStatusPlaceHolder);
  const [droneType, setDroneType] = useState(droneTypePlaceHolder);
  const [airMap, setAirMap] = useState(airMapPlaceHolder);
  const [fourHundred, setFourHundred] = useState(fourHundredPlaceHolder);
  const [profileComplete, setProfileComplete] = useState(
    profileCompletePlaceHolder
  );

  const submit = (e) => {
    console.log(currentUserProps);
    props.editPilotProfile(
      currentUserProps.pilotLocation,
      personalBio,
      yearsOfExperience,
      faaLicenseExp,
      insuredStatus,
      travelStatus,
      droneType,
      airMap,
      fourHundred,
      currentUserProps.profileComplete,
      profileImageUrl,
      currentUserProps.key
    );
    navigation.navigate("PilotProfileImageUploadScreen");
  };
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text style={styles.welcomeText}>
          Hi!
          {currentUserProps ? (
            <Text style={styles.subText}>
              {"\n"}
              {currentUserProps.pilotFirstName}
              {"\n"}
              {currentUserProps.pilotLastName}
            </Text>
          ) : (
            <Text>Name:</Text>
          )}
        </Text>
        <Text style={styles.bodyText}>
          Please Provide FAA License Expiration Date
        </Text>
        {currentUserProps ? (
          <View>
            <PassSetFaaLicenseContext.Provider value={setFaaLicenseExp}>
              <PassFaaLicenseState.Provider value={faaLicenseExp}>
                <DatePicker />
              </PassFaaLicenseState.Provider>
            </PassSetFaaLicenseContext.Provider>
            {/* <TextInput
            placeholder=" 10/10/2020"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setFaaLicenseExp}
            value={faaLicenseExp}
          /> */}
          </View>
        ) : (
          <Text style={styles.bodyText}>
            Please Provide FAA License Expiration Date
          </Text>
        )}
        <Text style={styles.bodyText}>
          Are You Willing To Trvel Out Of State For A Drone Job?
        </Text>
        {currentUserProps ? (
          <TextInput
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
              textAlign: "center",
            }}
            placeholder="Yes or No"
            onChangeText={setTravelStatus}
            value={travelStatus}
          />
        ) : (
          <Text style={styles.bodyText}>
            Are You Willing To Tarvel Out Of State For A Drone Job?
          </Text>
        )}

        <Text style={styles.bodyText}>
          Have You Had Experience Flying Over 400FT?
        </Text>
        {currentUserProps ? (
          <TextInput
            placeholder=" Yes or No"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setFourHundred}
            value={fourHundred}
          />
        ) : (
          <Text style={styles.bodyText}>
            Have You Had Experience Flying Over 400FT?
          </Text>
        )}
        <Text style={styles.bodyText}>Have You Used AirMap?</Text>
        {currentUserProps ? (
          <TextInput
            placeholder=" Yes or No"
            style={{
              marginTop: 20,
              height: 20,
              borderColor: "gray",
              borderWidth: 1,
              textAlign: "center",
              marginBottom: 20,
            }}
            onChangeText={setAirMap}
            value={airMap}
          />
        ) : (
          <Text style={styles.bodyText}>Have You Used AirMap?</Text>
        )}

        <Button title="Save and Continue" onPress={submit} />
        <Button title="Back" onPress={() => props.navigation.goBack()} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "lightgray",
    height: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  welcomeText: {
    marginTop: "15%",
    marginBottom: "10%",
    fontSize: 30,
    color: "darkblue",
    fontWeight: "600",
    textAlign: "center",
  },
  subText: {
    marginTop: "25%",
    marginBottom: "10%",
    fontSize: 30,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
  bodyText: {
    fontSize: 15,
    color: "black",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    height: 30,
    marginBottom: 80,
  },
});
function mapStateToProps(state) {
  const listOfProfiles = _.map(
    state.pilotProfilesList.pilotProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );
  return {
    listOfProfiles,
  };
}

export default connect(mapStateToProps, { getPilotProfiles, editPilotProfile })(
  PilotProfileSetupPageTwoScreen
);
