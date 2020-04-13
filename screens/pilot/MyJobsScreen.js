import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

const MyJobsScreen = () => {
  return (
    <View style={styles.myJobsListWrapper}>
      <TouchableOpacity style={styles.myJobsListTextWrapper}>
        <Text style={styles.myJobsText}>Your open jobs!</Text>
      </TouchableOpacity>

      <View style={styles.myJobsListForm}>
        <TouchableOpacity>
          <Text> These are my jobs </Text>
          <Text> These are my jobs </Text>
          <Text> These are my jobs </Text>
          <Text> These are my jobs </Text>
          <Text> These are my jobs </Text>
          <Text> These are my jobs </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myJobsListWrapper: {
    alignItems: "center"
  },
  myJobsListForm: {
    backgroundColor: "darkgray",
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  myJobsText: {
    fontSize: 30,
    color: "darkblue"
  },
  myJobsListTextWrapper: {
    marginBottom: 20
  }
});

export default MyJobsScreen;
