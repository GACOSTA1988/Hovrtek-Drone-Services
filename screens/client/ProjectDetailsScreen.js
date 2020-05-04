import React, { useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { getPilotProfiles } from "../../actions/index";
import _ from "lodash";

function ProjectDetailsScreen(props, { getPilotProfiles }) {

  const projectDetails = props.route.params;

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  let pilot = null;

  if (props.listOfPilotProfiles.find((x) => x.userID === projectDetails.pilotID)) {
    pilot = props.listOfPilotProfiles.find((x) => x.userID === projectDetails.pilotID)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.ProjectText}>Project Details</Text>
      <Text style={styles.DetailsText}>
        Project location: {projectDetails.location}
      </Text>
      <Text style={styles.DetailsText}>Project Date: {projectDetails.date}</Text>
      <Text style={styles.DetailsText}>
        Project Recording: {projectDetails.recording}
      </Text>
      {pilot ? (

      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(
            "PilotProfileWelcomeScreen",
            {
              ...pilot
            }
          )
        }
      >
        <Text style={styles.DetailsText}>
          Pilot: {pilot.pilotFirstName}{" "}{pilot.pilotLastName}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.DetailsText}>
        Pending Pilot
      </Text>
    )}
      <TouchableOpacity
        onPress={() => props.navigation.pop()}>
        <Text>Back to projects</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20
  },
  ProjectText: {
    fontSize: 30,
    color: "darkblue",
    marginBottom: 20,
    textAlign: "center",
    marginTop: 10
  },
  DetailsText: {
    marginBottom: 50,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "800"
  }
});

function mapStateToProps(state) {
  const listOfPilotProfiles = _.map(state.pilotProfilesList.pilotProfilesList, (val, key) => {
    return {
      ...val,
      key: key
    };
  });
  return {
    listOfPilotProfiles
  };
}

export default connect(mapStateToProps, { getPilotProfiles })(ProjectDetailsScreen);
