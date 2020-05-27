import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

function PilotSubheader(props) {
  const navigation = useNavigation();
  let pilotID = null;
  if (firebase.auth().currentUser) {
    pilotID = firebase.auth().currentUser.uid;
  }

  const [ homeActive, setHomeActive ] = useState(null);

  const pushHomeButton = () => {
    setHomeActive(true);
    navigation.navigate("JobListScreen");
  };

  const pushMyJobsButton = () => {
    setHomeActive(false);
    navigation.navigate("MyJobsScreen");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.topButtonWrapperLeft}
          onPress={pushHomeButton}
        >
          <Text style={styles.topButtonText}>Home</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          style={styles.topButtonWrapperRight}
          onPress={pushMyJobsButton}
        >
          <Text style={styles.topButtonText}>My Jobs</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
  },
  buttonWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  topButtonWrapperLeft: {
    backgroundColor: "#092455",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonWrapperLeftPressed: {
    backgroundColor: "#092455",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  topButtonWrapperRight: {
    backgroundColor: "#092455",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonWrapperRightPressed: {
    backgroundColor: "#092455",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  topButtonText: {
    color: "white",
  },
});

export default PilotSubheader;
