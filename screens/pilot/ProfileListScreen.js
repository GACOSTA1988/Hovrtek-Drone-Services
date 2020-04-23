import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  FlatList
} from "react-native";
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { getPilotProfiles } from "../../actions/index";
import _ from "lodash";

function ProfileListScreen(props, { getPilotProfiles }) {
  const navigation = useNavigation();

  useEffect(() => {
    props.getPilotProfiles();
  }, []);

  return (
    <View style={styles.profileListWrapper}>
      <TouchableOpacity style={styles.PilotProfileListTextWrapper}>
        <Text style={styles.pilotText}>Current Profiles</Text>
      </TouchableOpacity>

      <View style={styles.profileCard}>
        <TouchableOpacity>
          <Text> ALL PROFILES </Text>
          <FlatList
            style={{ width: "100%" }}
            data={props.listOfPilotProfiles}
            keyExtractor={item => item.key}
            renderItem={({ item }) => {
              return (
                <View>
                  <Text style={styles.name}> {item.name} </Text>
                  <Text>Overview: {item.overview}</Text>
                  <Text>Equipment: {item.equipment}</Text>
                  <Text>Availability: {item.availability}</Text>
                </View>
              );
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  pilotText: {
    fontSize: 30,
    color: "darkblue"
  },
  PilotProfileListTextWrapper: {
    marginBottom: 20
  },
  profileListWrapper: {
    alignItems: "center"
  },
  name: {
    fontSize: 20,
    marginTop: 30
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

export default connect(mapStateToProps, { getPilotProfiles })(ProfileListScreen);
