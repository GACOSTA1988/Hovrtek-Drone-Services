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
import { editClientProfile, deleteClientProfile } from "../../actions/clientProfiles";
import ProfileUploader from "../../components/shared/ProfileUploader";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import deleteUser from "../../actions/users"
import LoadingScreen from "../../screens/LoadingScreen"

// CONTEXT HOOKS PROFILE IMAGE URL
export const PassSetProfileImageUrlContext = React.createContext();
export const PassProfileImageUrlState = React.createContext();

// todo move to app strings
const pageUnavailable = "Page unavailable";
const saveChanges = "Save Changes";

function ClientEditProfileScreen(props, { editClientProfile, deleteClientProfile }) {
  let profileDetails = props.route.params;

  const [ firstName, setFirstName ] = useState(profileDetails.firstName);
  const [ lastName, setLastName ] = useState(profileDetails.lastName);
  const [ location, setLocation ] = useState(profileDetails.location);
  const [ bio, setBio ] = useState(profileDetails.bio);
  const [ industry, setIndustry ] = useState(profileDetails.industry);
  const [ paymentType, setPaymentType ] = useState(profileDetails.paymentType);
  const [ profileImageUrl, setProfileImageUrl ] = useState(profileDetails.profileImageUrl);

  const [loadingActive, setLoadingActive] = useState(false);

  const pluckImage = (imgUrl = "") => {
    setProfileImageUrl(imgUrl);
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
      isMultiline = false,
    } = textInputItemMetadata;

    return (
      <React.Fragment>
        <Text style={textStyle}>{text}</Text>
        <TextInput
          style={textInputStyle}
          placeholder={textInputValue}
          value={textInputValue}
          onChangeText={onChangeText}
          multiline={isMultiline}
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

  function deleteProfile() {
    deleteUser();
    props.deleteClientProfile(profileDetails.key);
  }

  return (
    <KeyboardAwareScrollView style={styles.keyboardView}>
    {loadingActive ?
      <LoadingScreen />
      :
      <View>
        {!profileDetails && <Text>{pageUnavailable}</Text>}
        {profileDetails && (
          <View>
            <Image source={princePic01} style={styles.backgroundImage} />

            <View style={styles.saveButton}>
              <TouchableOpacity onPress={saveEdits}>
                <Text style={styles.saveText}>{saveChanges}</Text>
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

            {renderFirstAndLastName()}

            <View style={styles.info}>
              <View style={styles.inlineView}>
                {renderTextInputItem({
                  text: "Location: ",
                  textStyle: styles.otherInput,
                  textInputStyle: styles.otherInput,
                  textInputValue: location,
                  onChangeText: setLocation,
                })}
              </View>

              <View>
                {renderTextInputItem({
                  text: "Bio: ",
                  textStyle: { fontSize: 20, marginTop: 10, color: "#DDE2E4" },
                  textInputStyle: styles.input,
                  textInputValue: bio,
                  onChangeText: setBio,
                  isMultiline: true,
                })}
              </View>

              <View style={styles.inlineView}>
                {renderTextInputItem({
                  text: "Industry: ",
                  textStyle: styles.otherInput,
                  textInputStyle: styles.inputBottom,
                  textInputValue: industry,
                  onChangeText: setIndustry,
                })}
              </View>

              <View style={styles.inlineView}>
                {renderTextInputItem({
                  text: "Payment type: ",
                  textStyle: styles.otherInput,
                  textInputStyle: styles.inputBottom,
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
                    triggerLoading={() => setLoadingActive(true)}
                    disableLoading={() => setLoadingActive(false)}
                    pluckImage={(image) => pluckImage(image)}
                  />
                </PassProfileImageUrlState.Provider>
              </PassSetProfileImageUrlContext.Provider>
            </View>
          </View>
        )}
        <TouchableOpacity
          onPress={() => deleteProfile()}
          >
          <Text style={{color: "white"}}>Delete Profile</Text>
        </TouchableOpacity>
      </View>
    }
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    height: "100%",
    backgroundColor: "#161616"
  },
  text: {
    fontSize: 20,
  },
  name: {
    fontSize: 30,
    marginLeft: 4,
    marginRight: 4,
    color: "#DDE2E4",
  },
  names: {
    flexDirection: "row",
    marginLeft: 16,
    width: "65%",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 90,
    alignItems: "center",
    marginTop: "67%",
    marginLeft: 20,
    borderWidth: 4,
    borderColor: "#DDE2E4"
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
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
  },
  input: {
    fontSize: 15,
    marginBottom: 3.5,
    color: "#DDE2E4",
  },
  otherInput: {
    fontSize: 15,
    color: "#DDE2E4",
  },
  imagePress: {
    width: 100,
    marginBottom: 3.5
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  inputBottom: {
    fontSize: 20,
    marginLeft: 5,
    color: "#DDE2E4"
  },
  inlineView: {
    flexDirection: "row",
    marginTop: 10
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 3.5,
  },
});

export default connect(null, { editClientProfile, deleteClientProfile })(ClientEditProfileScreen);
