import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import personIcon from "../../assets/personIcon.png";
import princePic01 from "../../assets/princePic01.jpg";
import { connect } from "react-redux";
import { editClientProfile } from "../../actions/index";
import ClientProfileUploader from "../../components/client/ClientProfileUploader";

// CONTEXT HOOKS PROFILE IMAGE URL
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();
function ClientEditProfileScreen(props, { editClientProfile }) {
  let profileDetails = props.route.params;

  const [firstName, setFirstName] = useState(profileDetails.firstName);
  const [lastName, setLastName] = useState(profileDetails.lastName);
  const [location, setLocation] = useState(profileDetails.location);
  const [bio, setBio] = useState(profileDetails.bio);
  const [industry, setIndustry] = useState(profileDetails.industry);
  const [paymentType, setPaymentType] = useState(profileDetails.paymentType);
  const [profileImageUrl, setProfileImageUrl] = useState(
    profileDetails.profileImageUrl
  );

  const save = () => {
    profileDetails.firstName = firstName;
    profileDetails.lastName = lastName;
    profileDetails.location = location;
    profileDetails.bio = bio;
    profileDetails.industry = industry;
    profileDetails.paymentType = paymentType;
    profileDetails.profileImageUrl = profileImageUrl;
    props.editClientProfile(
      firstName,
      lastName,
      location,
      bio,
      industry,
      paymentType,
      profileImageUrl,
      profileDetails.key
    );
    console.log("PROFILE DETAILS", profileDetails);
    props.navigation.navigate("ClientProfileScreen", { ...profileDetails });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      {profileDetails ? (
        <View>
          <Image source={princePic01} style={styles.backgroundImage} />
          <View style={styles.saveButton}>
            <TouchableOpacity onPress={() => save()}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert("todo: choose image")}
            style={styles.imagePress}
          >
            <Image source={personIcon} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={styles.names}>
            <TextInput
              style={styles.name}
              placeholder={firstName}
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.name}
              placeholder={lastName}
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.info}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 20 }}>Client is located in </Text>
              <TextInput
                style={{ fontSize: 20 }}
                placeholder={location}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View>
              <Text style={{ fontSize: 20, marginTop: 10 }}>Bio: </Text>
              <TextInput
                style={styles.input}
                placeholder={bio}
                value={bio}
                onChangeText={setBio}
                multiline={true}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ fontSize: 20 }}>Industry:</Text>
              <TextInput
                style={{ fontSize: 20, marginLeft: 5 }}
                placeholder={industry}
                value={industry}
                onChangeText={setIndustry}
              />
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={{ fontSize: 20 }}>Payment type:</Text>
              <TextInput
                style={{ fontSize: 20, marginLeft: 5 }}
                placeholder={paymentType}
                value={paymentType}
                onChangeText={setPaymentType}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <PassSetProfileImageUrlContext.Provider value={setProfileImageUrl}>
              <PassProfileImageUrlState.Provider value={profileImageUrl}>
                <ClientProfileUploader />
              </PassProfileImageUrlState.Provider>
            </PassSetProfileImageUrlContext.Provider>
          </View>
        </View>
      ) : (
        <Text>Page unavailable</Text>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  name: {
    fontSize: 30,
    marginLeft: 6,
  },
  names: {
    flexDirection: "row",
    marginLeft: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginLeft: 20,
  },
  info: {
    margin: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 130,
    position: "absolute",
  },
  saveButton: {
    marginTop: 150,
    position: "absolute",
    right: 20,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
  },
  input: {
    fontSize: 15,
  },
  imagePress: {
    width: 100,
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
});

export default connect(null, { editClientProfile })(ClientEditProfileScreen);
