import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getClientProfiles } from "../../actions/index";
import _ from "lodash";

function JobDetailsScreen(props, { getClientProfiles }) {

  const jobDetails = props.route.params;

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  let client = null;

  if (props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)) {
    client = props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.ProjectText}>Project Details</Text>
      <Text style={styles.DetailsText}>
        Project location: {jobDetails.location}
      </Text>
      <Text style={styles.DetailsText}>Project Date: {jobDetails.date}</Text>
      <Text style={styles.DetailsText}>
        Project Recording: {jobDetails.recording}
      </Text>
      {client ? (
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate(
            "ClientProfileScreen",
            {
              ...client
            }
          )
        }
      >

        <Text style={styles.DetailsText}>
          Client: {client.firstName}{" "}{client.lastName}
        </Text>
      </TouchableOpacity>
    ) : (
      <Text style={styles.DetailsText}>
        Client:
      </Text>
    )}

      <View>
        {!jobDetails.pilotID ? (
          <TouchableOpacity
            style={styles.back}
            onPress={() =>
              props.navigation.navigate(
                "AcceptJobScreen",
                {
                  ...jobDetails
                }
              )
            }
          >
            <Text style={styles.backText}>Accept Job</Text>
          </TouchableOpacity>

        ) : (
          <Text>This job is no longer available</Text>
        )}
        <TouchableOpacity
        style={styles.back}
        onPress={()=> props.navigation.navigate('JobListScreen')}
        >
          <Text style={styles.backText}>Back to Available Jobs</Text>

        </TouchableOpacity>
      </View>
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
  },
  back: {
    borderRadius: 5,
    backgroundColor: 'red',
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#092455',
    margin: 10

  },
  backText: {
    textAlign: 'center',
    color: 'white'
  }
});

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

export default connect(mapStateToProps, { getClientProfiles })(JobDetailsScreen);
