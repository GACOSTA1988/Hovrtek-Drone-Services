import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getClientProfiles } from "../../actions/clientProfiles";
import _ from "lodash";
import { AuthContext } from "../../context";

function JobDetailsScreen(props, { getClientProfiles }) {

  const jobDetails = props.route.params;

  const { setMainHeader } = useContext(AuthContext);
  setMainHeader();

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  let client = null;

  if (props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)) {
    client = props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)
  }

  return(
    <View style={styles.container}>
      <Text style={styles.ProjectText}>Details:</Text>
      <View style={styles.line} />
      <Text style={styles.detailsHeader}>Where</Text>
      <Text style={styles.DetailsText}>
        {jobDetails.location}
      </Text>
      <Text style={styles.detailsHeader}>When</Text>
      <Text style={styles.DetailsText}>{jobDetails.date}</Text>
      <Text style={styles.detailsHeader}>What</Text>
      <Text style={styles.DetailsText}>{jobDetails.recording}</Text>
      <Text style={styles.detailsHeader}>Client</Text>
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
          <View style={{flexDirection: "row"}}>
          {client.profileImageUrl ? (
            <Image
            source={{
              uri: client.profileImageUrl
            }}
            style={styles.profilePic}
            />
          ) : (
            <Image
            source={{
              uri: "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200"
            }}
            style={styles.profilePic}
            />
          )}
            <Text style={styles.nameText}>{client.firstName}{" "}{client.lastName}</Text>
          </View>
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
    padding: 20
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3E90D0",
    marginBottom: 20,
    marginTop: 10
  },
  DetailsText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    fontWeight: "800"
  },
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold"
  },
  back: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: "darkblue"
  },
  nameText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    marginTop: 20,
    fontWeight: "bold",
    color: "darkblue"
  },
  unnamedText: {
    marginBottom: 20,
    fontSize: 17,
    color: "grey",
    marginTop: 20
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 90,
    marginTop: 5,
    // borderWidth: 4,
    // borderColor: "#092455",
    marginRight: 10
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
