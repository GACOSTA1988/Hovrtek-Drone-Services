import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import personIcon from "../../assets/personIcon.png";
import princePic01 from "../../assets/princePic01.jpg";
import * as firebase from "firebase";
import { connect } from "react-redux";
import _ from "lodash";
import { getClientProfiles } from "../../actions/clientProfiles";

function ClientProfileScreen(props, { getClientProfiles }) {
  useEffect(() => {
    props.getClientProfiles();
  }, []);

  let passedProps = props.route.params;

  const [ profileDetails, setProfileDetails ] = useState(null);

  let user = null;
  let profile = null;
  if (firebase.auth().currentUser) {
    user = firebase.auth().currentUser;
    profile = props.listOfClientProfiles.find((x) => x.userID === user.uid);

    // if user is client, get client profile
    if (user.photoURL === "C") {
      try {
        if (!profileDetails && profile) {
          setProfileDetails(profile);
          passedProps = profile;
        } else if (passedProps && profileDetails != passedProps) {
          setProfileDetails(passedProps);
        }
      } catch (error) {
        Alert.alert("User page unavailable");
        props.navigation.navigate("ProjectListScreen");
      }
      // if user is pilot sent from JobsList, get client associated with that job's profile
    } else if (props.route.params && !profileDetails) {
      try {
        setProfileDetails(props.route.params);
      } catch (error) {
        Alert.alert("User page unavailable");
        props.navigation.navigate("JobListScreen");
      }
    }
  } else {
    if (profileDetails) {
      setProfileDetails(null);
    }
  }

  return (
    <View style={styles.container}>
      {user && profileDetails ? (
        <View>
          <Image source={princePic01} style={styles.backgroundImage} />
          <View style={styles.editIcon}>
            {profileDetails.userID === user.uid ? (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate("ClientEditProfileScreen", {
                    ...profileDetails,
                  })}
              >
                <AntDesign name="edit" size={40} />
              </TouchableOpacity>
            ) : (
              <View>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() =>
                    props.navigation.navigate("ChatScreen", {
                      ...profileDetails,
                    })}
                >
                  <Text style={styles.chatText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => props.navigation.pop()}
                >
                  <Text style={styles.chatText}>Back</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Image
            source={{
              uri: profileDetails.profileImageUrl,
            }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>
            {profileDetails.firstName} {profileDetails.lastName}
          </Text>
          <View style={styles.info}>
            <Text style={styles.headerText}>
              Location: {profileDetails.location}
            </Text>
            <Text style={styles.bioHeaderText}>Bio: </Text>
            <Text style={styles.bioText}>{profileDetails.bio}</Text>
            {profileDetails.industry != "Set industry" ? (
              <Text style={styles.headerText}>
                Industry: {profileDetails.industry}
              </Text>
            ) : (
              <Text style={styles.headerText}>No industry details</Text>
            )}
            {profileDetails.industry != "Set industry" ? (
              <Text style={styles.headerText}>
                Payment type: {profileDetails.paymentType}
              </Text>
            ) : (
              <Text style={styles.headerText}>No payment type details</Text>
            )}
          </View>
        </View>
      ) : (
        <Text>User unavailable</Text>
      )}
    </View>
  );
}

function mapStateToProps(state) {
  const listOfClientProfiles = _.map(
    state.clientProfilesList.clientProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    },
  );
  return {
    listOfClientProfiles,
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name: {
    fontSize: 30,
    marginLeft: 20,
    width: 300,
    marginTop: 4,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 90,
    alignItems: "center",
    marginTop: "17%",
    marginLeft: 20,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#092455",
  },
  info: {
    margin: 20,
  },
  backgroundImage: {
    width: "100%",
    height: 130,
    position: "absolute",
  },
  editIcon: {
    marginTop: 160,
    position: "absolute",
    right: 20,
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  chatButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
  },
  backButton: {
    position: "absolute",
    right: 0,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5,
    top: 60,
  },
  headerText: {
    fontSize: 20,
    marginTop: 10,
  },
  bioHeaderText: {
    fontSize: 20,
    marginTop: 11,
  },
  bioText: {
    fontSize: 15,
    marginTop: 3.5,
    marginBottom: 3,
  },
});

export default connect(mapStateToProps, { getClientProfiles })(
  ClientProfileScreen,
);
