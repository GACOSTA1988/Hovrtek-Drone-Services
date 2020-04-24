import React, { useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';

function JobDetailsScreen(props) {
  const navigation = useNavigation();

  const jobDetails = props.route.params;
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

      <View>
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
   
  },
  backText: {
    textAlign: 'center',
    color: 'white'
  }
});

export default JobDetailsScreen;
