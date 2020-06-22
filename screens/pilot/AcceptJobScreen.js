import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { acceptJob } from "../../actions/projects";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

function AcceptJobScreen(props, { acceptJob }) {
  const navigation = useNavigation();
  const jobDetails = props.route.params;
  let pilotID = null;
  if (firebase.auth().currentUser) {
    pilotID = firebase.auth().currentUser.uid;
  }

  const accept = (e) => {
    e.preventDefault();
    props.acceptJob(pilotID, jobDetails.key);
    navigation.popToTop();
    navigation.navigate("Projects");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.servicesText}>Are you sure?</Text>
      <View style={styles.wrapper}>
        <TouchableOpacity style={styles.chatButton} onPress={accept}>
          <Text style={styles.chatText}> Yes </Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.chatButton} onPress={() => props.navigation.goBack()}>
          <Text style={styles.chatText}> Cancel </Text>  
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#161616"
  },
  servicesText: {
    fontSize: 20,
    color: "#DDE2E4"
  },
  wrapper: {
    flexDirection: "row",
    margin: '5%'
  },
  chatText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#161616",
  },
  chatButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#DDE2E4",
    padding: 7,
    borderRadius: 5,
    margin: 20,
    height: '35%',
  },
});




export default connect(null, { acceptJob })(AcceptJobScreen);
