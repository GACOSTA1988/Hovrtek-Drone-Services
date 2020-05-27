import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import personIcon from "../../assets/personIcon.png";
import princePic01 from "../../assets/princePic01.jpg";
import { connect } from "react-redux";
import { editClientProfile } from "../../actions/clientProfiles";
import ProfileUploader from "../../components/shared/ProfileUploader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// CONTEXT HOOKS PROFILE IMAGE URL
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();

// todo move to app strings
const pageUnavailable = "Page unavailable";
const saveChanges = "Save Changes";

function ClientEditProfileScreen(props, { editClientProfile }) {
  console.log("PERSON ICON IN CLIENT EDIT PROFILE: ", personIcon);
  let profileDetails = props.route.params;

  const [ firstName, setFirstName ] = useState(profileDetails.firstName);
  const [ lastName, setLastName ] = useState(profileDetails.lastName);
  const [ location, setLocation ] = useState(profileDetails.location);
  const [ bio, setBio ] = useState(profileDetails.bio);
  const [ industry, setIndustry ] = useState(profileDetails.industry);
  const [ paymentType, setPaymentType ] = useState(profileDetails.paymentType);

  const [ profileImageUrl, setProfileImageUrl ] = useState(
    profileDetails.profileImageUrl,
  );

  const pluckImage = (imgUrl = "") => {
    setProfileImageUrl(imgUrl);
    console.log(profileImageUrl);
  };

  const saveEdits = () => {
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
      profileDetails.key,
    );

    props.navigation.navigate("ClientProfileScreen", { ...profileDetails });
  };

  const renderTextInputItem = (textInputItemMetadata = {}) => {
    const {
      text,
      textStyle,
      textInputStyle,
      textInputValue,
      onChangeText,
    } = textInputItemMetadata;

    return (
      <React.Fragment>
        <Text style={textStyle}>{text}</Text>
        <TextInput
          style={textInputStyle}
          placeholder={textInputValue}
          value={textInputValue}
          onChangeText={onChangeText}
        />
      </React.Fragment>
    );
  };

  const renderFirstAndLastName = () => {
    const names = [
      {
        name: firstName,
        onChangeText: setFirstName,
      },
      {
        name: lastName,
        onChangeText: setLastName,
      },
    ];

    return (
      <View style={styles.names}>
        {names.map((n) => {
          const { name, onChangeText } = n;

          return (
            <TextInput
              key={`name-${name}`}
              style={styles.name}
              placeholder={name}
              value={name}
              onChangeText={onChangeText}
            />
          );
        })}
      </View>
    );
  };

  return (
    <KeyboardAwareScrollView style={styles.keyboardView}>
      {!profileDetails && <Text>{pageUnavailable}</Text>}

      {profileDetails && (
        <View>
          <Image source={princePic01} style={styles.backgroundImage} />

          <View style={styles.saveButton}>
            <TouchableOpacity hitSlop={styles.hitSlop} onPress={saveEdits}>
              <Text style={styles.saveText}>{saveChanges}</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => Alert.alert("todo: choose image")}
            style={styles.imagePress}
          >
            <Image source={personIcon} style={styles.profileImage} />
          </TouchableOpacity>

          {renderFirstAndLastName()}

          <View style={styles.info}>
            <View style={{ flexDirection: "row" }}>
              {renderTextInputItem({
                text: "Client is located in ",
                textStyle: { fontSize: 20 },
                textInputStyle: { fontSize: 20 },
                textInputValue: location,
                onChangeText: setLocation,
              })}
            </View>

            <View>
              {renderTextInputItem({
                text: "Bio: ",
                textStyle: { fontSize: 20, marginTop: 10 },
                textInputStyle: styles.input,
                textInputValue: bio,
                onChangeText: setBio,
                // multiline={true}
              })}
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {renderTextInputItem({
                text: "Industry: ",
                textStyle: { fontSize: 20 },
                textInputStyle: { fontSize: 20, marginLeft: 5 },
                textInputValue: industry,
                onChangeText: setIndustry,
              })}
            </View>

            <View style={{ flexDirection: "row", marginTop: 10 }}>
              {renderTextInputItem({
                text: "Payment type: ",
                textStyle: { fontSize: 20 },
                textInputStyle: { fontSize: 20, marginLeft: 5 },
                textInputValue: paymentType,
                onChangeText: setPaymentType,
              })}
            </View>
          </View>

          <View style={{ alignItems: "center", marginBottom: 50 }}>
            <PassSetProfileImageUrlContext.Provider value={setProfileImageUrl}>
              <PassProfileImageUrlState.Provider value={profileImageUrl}>
                <ProfileUploader
                  hasSquareImage={false}
                  pluckImage={(image) => pluckImage(image)}
                />
              </PassProfileImageUrlState.Provider>
            </PassSetProfileImageUrlContext.Provider>
          </View>
        </View>
      )}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    height: "100%",
  },
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
  hitSlop: {
    top: 30,
    left: 30,
    bottom: 30,
    right: 30,
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
