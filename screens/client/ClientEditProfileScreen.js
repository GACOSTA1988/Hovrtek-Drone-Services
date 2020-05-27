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
import { editClientProfile } from "../../actions/clientProfiles";
import ClientProfileUploader from "../../components/client/ClientProfileUploader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// CONTEXT HOOKS PROFILE IMAGE URL
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();
function ClientEditProfileScreen(props, { editClientProfile }) {
  console.log("PERSON ICON IN CLIENT EDIT PROFILE: ", personIcon);
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

    props.navigation.navigate("ClientProfileScreen", { ...profileDetails });
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      {profileDetails && (
        <View>
          <Image source={princePic01} style={styles.backgroundImage} />
          <View style={styles.saveButton}>
            <TouchableOpacity
              hitSlop={styles.hitSlop}
              onPress={() => save()}
            >
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
          {profileDetails.profileImageUrl ? (
            <TouchableOpacity
              onPress={() => Alert.alert("todo: choose image")}
              style={styles.imagePress}
            >
              <Image source={{uri: profileDetails.profileImageUrl}} style={styles.profileImage} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Alert.alert("todo: choose image")}
              style={styles.imagePress}
            >
              <Image source={personIcon} style={styles.profileImage} />
            </TouchableOpacity>
          )}
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
            <View style={styles.inlineView}>
              <Text style={styles.text}>Location: </Text>
              <TextInput
                style={styles.text}
                placeholder={location}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View>
              <Text style={styles.headerText}>Bio: </Text>
              <TextInput
                style={styles.input}
                placeholder={bio}
                value={bio}
                onChangeText={setBio}
                multiline={true}
              />
            </View>
            <View style={styles.inlineView}>
              <Text style={styles.text}>Industry:</Text>
              <TextInput
                style={styles.inputBottom}
                placeholder={industry}
                value={industry}
                onChangeText={setIndustry}
              />
            </View>
            <View style={styles.inlineView}>
              <Text style={styles.text}>Payment type:</Text>
              <TextInput
                style={styles.inputBottom}
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
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    fontSize: 20
  },
  name: {
    fontSize: 30,
    marginLeft: 4,
    marginRight: 4
  },
  names: {
    flexDirection: "row",
    marginLeft: 16,
    width: "65%"
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 90,
    alignItems: "center",
    marginTop: "67%",
    marginLeft: 20,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#092455"
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
    marginTop: 140,
    position: "absolute",
    right: 10,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
  },
  input: {
    fontSize: 15,
    marginBottom: 3.5
  },
  imagePress: {
    width: 100,
    marginBottom: 3.5
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  inputBottom: {
    fontSize: 20,
    marginLeft: 5,
  },
  inlineView: {
    flexDirection: "row",
    marginTop: 10
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 3.5
  },
  hitSlop: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30
  }
});

export default connect(null, { editClientProfile })(ClientEditProfileScreen);
