import React from 'react';
import {  Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const NewProjectScreen = () => {

  return (
    <View style={styles.newProjectListWrapper}>
    <TouchableOpacity style={styles.newProjectListTextWrapper}>
    <Text style={styles.newProjectText}>Create a New Project</Text>
    </TouchableOpacity>

    <View style={styles.newProjectListForm}>
      <TouchableOpacity>
      <Text> This is a big ass form </Text>
            <Text> This is a big ass form</Text>
        <Text> This is a big ass form</Text>
        </TouchableOpacity>
      </View>
  </View>


  )
}

const styles = StyleSheet.create({
  newProjectListWrapper:{
    alignItems: 'center'
  },
  newProjectListForm: {
    backgroundColor: 'darkgray',
    width: 380,
    borderWidth: 1,
    padding: 6
  },
  newProjectText: {
    fontSize: 30,
    color: 'darkblue'
  },
  newProjectListTextWrapper: {
    marginBottom: 20,
  },
});

export default NewProjectScreen
