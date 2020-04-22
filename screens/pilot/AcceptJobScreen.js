import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { acceptJob } from "../../actions/index";
import { connect } from "react-redux";

function AcceptJobScreen(props, { acceptJob }) {
  const jobDetails = props.route.params;

  const accept = (e) => {
    e.preventDefault();
    props.acceptJob(false, jobDetails.key);
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
