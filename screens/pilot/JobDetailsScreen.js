import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getClientProfiles } from "../../actions/clientProfiles";
import _ from "lodash";

function JobDetailsScreen(props) {
  const jobDetails = props.route.params;

  useEffect(() => {
    props.getClientProfiles();
  }, []);

  let client = null;

  if (
    props.listOfClientProfiles.find((x) => x.userID === jobDetails.clientID)
  ) {
    client = props.listOfClientProfiles.find(
      (x) => x.userID === jobDetails.clientID
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.detailsHeader}>Where:</Text>
      <Text style={styles.DetailsText}>{jobDetails.location}</Text>
      <Text style={styles.detailsHeader}>When:</Text>
      <Text style={styles.DetailsText}>{jobDetails.date}</Text>
      <Text style={styles.detailsHeader}>What:</Text>
      <Text style={styles.DetailsText}>{jobDetails.recording}</Text>
      <Text style={styles.detailsHeader}>Client:</Text>
      {client ? (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("ClientProfileScreen", {
              ...client,
            })
          }
        >
          <View style={{ flexDirection: "row" }}>
            {client.profileImageUrl ? (
              <Image
                source={{
                  uri: client.profileImageUrl,
                }}
                style={styles.profilePic}
              />
            ) : (
              <Image
                source={{
                  uri:
                    "https://thenypost.files.wordpress.com/2017/07/ameliaearhart.jpg?quality=90&strip=all&w=1200",
                }}
                style={styles.profilePic}
              />
            )}
            <Text style={styles.nameText}>
              {client.firstName} {client.lastName}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <Text style={styles.DetailsText}>Client:</Text>
      )}

      <View style={styles.jobAvailabilityWrapper}>
        {!jobDetails.pilotID ? (
          <View style={styles.acceptJobWrapper}>
            <TouchableOpacity 
              style={styles.acceptJobButtonWrapper}
              onPress={() =>
                props.navigation.navigate("AcceptJobScreen", {
                  ...jobDetails,
                })
              } >
              <Text style={styles.acceptJobText}>
                Accept Job
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#161616"
  },
  ProjectText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#DDE2E4",
    marginBottom: 20,
    marginTop: 10,
  },
  DetailsText: {
  backgroundColor: "rgba(221,226,228, 0.2)", 
  padding:10, 
  width: "100%", 
  marginTop: 10, 
  borderRadius: 5,
  marginBottom: 20,
  fontSize: 17,
  color: "#DDE2E4",
  fontWeight: "800",
  },
  line: {
    borderBottomColor: "#DDE2E4",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  detailsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#DDE2E4"
  },
  back: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#DDE2E4",
    textAlign: "center",
  },
  accept: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    textAlign: "center",
  },
  nameText: {
    marginBottom: 20,
    fontSize: 17,
    color: "#DDE2E4",
    marginTop: 20,
    fontWeight: "bold",
    color: "#DDE2E4",
  },
  unnamedText: {
    marginBottom: 20,
    fontSize: 17,
    color: "#DDE2E4",
    marginTop: 20,
  },
  profilePic: {
    height: 50,
    width: 50,
    borderRadius: 90,
    marginTop: 5,
    // borderWidth: 4,
    // borderColor: "#DDE2E4",
    marginRight: 10,
    borderWidth: 2,
    borderColor: "#DDE2E4"
  },
  jobAvailabilityWrapper: {
    marginBottom: 100,
    textAlign: "center",
    justifyContent: "center",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    width: 160,
    height: 30,
    backgroundColor: "#DDE2E4",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "white",
    textAlign: "center",
    // marginBottom: 40,
  },
  backButtonWrapper: {
    alignItems: "center",
  },
  acceptJobButtonWrapper: {
    width: 170,
    height: 60,
    borderWidth: 2,
    borderColor: "#DDE2E4",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  acceptJobText: {
    fontSize: 25,
    color: "#DDE2E4",
  },
  acceptJobWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
});

function mapStateToProps(state) {
  const listOfClientProfiles = _.map(
    state.clientProfilesList.clientProfilesList,
    (val, key) => {
      return {
        ...val,
        key: key,
      };
    }
  );
  return {
    listOfClientProfiles,
  };
}

export default connect(mapStateToProps, { getClientProfiles })(
  JobDetailsScreen
);
