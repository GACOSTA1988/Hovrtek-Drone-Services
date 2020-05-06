import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { acceptJob } from "../../actions/projects";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import * as firebase from 'firebase';

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
    navigation.navigate("JobListScreen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.servicesText}>Are you sure?</Text>
      <Button title="Yes" onPress={accept} />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  servicesText: {
    fontSize:20
  }
});

export default connect(null, { acceptJob })(AcceptJobScreen);
