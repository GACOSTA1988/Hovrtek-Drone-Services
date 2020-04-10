import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import ClientHomeToggle from '../../components/client/ClientHomeToggle.js';
import ClientHeader from '../../components/client/ClientHeader.js';
import ProjectList from './ProjectListScreen.js';
import NewProject from './NewProjectScreen.js';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function ClientHomeScreen(props) {
  const navigation = useNavigation();

  console.warn("these are the props in home: ");
  console.warn(props);

  // Hamburger menu push function. Works in android and not ios
  function handlePushBurger(e) {
    navigation.toggleDrawer();
  }

  // Conditional Rendering state for ProjectList / New Project Tab
  const [ newProjectViewActive, setNewProjectViewActive ] = useState(false);
  const [ projectsViewActive, setProjectsViewActive ] = useState(true);

  const toggleProjectListState = () => {
    setNewProjectViewActive(true)
    setProjectsViewActive(false)
  }

  const toggleNewProjectState = () => {
    setNewProjectViewActive(true)
    setNewProjectViewActive(false)
  }

  const handleNewProjectView = () => {
    return newProjectViewActive ? <NewProject/> :  <ProjectList/>
  }

  return (
    <View style={styles.clientWrapper}>
  
      <ClientHomeToggle
        toggleProjectListState={()=> toggleProjectListState()}
        toggleNewProjectState={()=> toggleNewProjectState()}
      />
      <ScrollView style={styles.ClientListcontainer} contentContainerStyle={styles.contentClientContainer}>{handleNewProjectView()}</ScrollView>
    </View>
  )

}

const styles = StyleSheet.create({
  clientWrapper: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },

  // contentClientContainer: {
  //   marginTop: 20,
  //   alignItems: 'center',
  // },
});