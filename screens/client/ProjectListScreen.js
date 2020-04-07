import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ProjectListScreen = () => {

  return (
    <View style={styles.projectListWrapper}>
    <TouchableOpacity style={styles.ClientProjectListTextWrapper}>
    <Text style={styles.clientText}>Current Projects</Text>
    </TouchableOpacity>

    <View style={styles.projectCard}>
      <TouchableOpacity>
      <Text> This is a Project. </Text>
            <Text> When: April 20th, 2020 </Text>
        <Text> Notes: I want a drone to spy on my neighbor </Text>
        </TouchableOpacity>
      </View>
  </View>

  )
}

const styles = StyleSheet.create({
  projectCard: {
    backgroundColor: 'darkgray',
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  clientText: {
    fontSize: 30,
    color: 'darkblue'
  },
  ClientProjectListTextWrapper: {
    marginBottom: 20,
  },
  projectListWrapper: {
    alignItems: 'center'
  }
});

export default ProjectListScreen
