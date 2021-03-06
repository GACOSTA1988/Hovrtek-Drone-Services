import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

function ClientSubheader(props) {
  const navigation = useNavigation();
  let clientID = null;
  if (firebase.auth().currentUser) {
    clientID = firebase.auth().currentUser.uid;
  }

  const [ homeActive, setHomeActive ] = useState(null);

  const pushHomeButton = () => {
    setHomeActive(true);
    navigation.navigate("NewProjectScreenWelcome");
  };

  const pushProjectsButton = () => {
    setHomeActive(false);
    navigation.navigate("ProjectListScreen");
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
          onPress={pushProjectsButton}
        >
          <Text style={styles.topButtonText}>Projects</Text>
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
    backgroundColor: "#161616",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonWrapperLeftPressed: {
    backgroundColor: "#161616",
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
    backgroundColor: "#161616",
    height: 40,
    width: 160,
    alignSelf: "flex-start",
    borderRadius: 5,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  topButtonWrapperRightPressed: {
    backgroundColor: "#161616",
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

export default ClientSubheader;
