import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Image } from "react-native";
import personIcon from '../../assets/personIcon.png';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import _ from "lodash";
import { getClientProfiles } from "../../actions/index";

function ClientProfileScreen(props, { getClientProfiles }) {

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  const [profileDetails, setProfileDetails] = useState('');

  if (firebase.auth().currentUser) {
    const user = firebase.auth().currentUser
    // if user is client, get client profile
    if (user.photoURL === "C") {
      try {
        setProfileDetails(props.listOfClientProfiles.find((x) => x.userID === user.uid));
        console.log("profile details: ", profileDetails);
      } catch {
        // code is hitting this catch block every single time. And it breaks without it. why????
        // Alert.alert("User page unavailable 1");
      }
    // if user is pilot sent from JobsList, get client associated with that job's profile
  } else if (props.route.params.clientID) {
      setProfileDetails(props.listOfClientProfiles.find((x) => x.userID === props.route.params.clientID));
    } else {
      Alert.alert("User page unavailable");
      props.navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      { profileDetails ? (
        <View>
          <Image source={personIcon} />
          <Text style={styles.name}>{profileDetails.clientName}</Text>
          <Text>This client is in {profileDetails.clientLocation}</Text>
        </View>
      ) : (
        <Text>User unavailable</Text>
      )}
    </View>
  )
};

function mapStateToProps(state) {
  const listOfClientProfiles = _.map(state.clientProfilesList.clientProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfClientProfiles
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  name: {
    fontSize: 20
  }
});

export default connect(mapStateToProps, {getClientProfiles })(ClientProfileScreen);
