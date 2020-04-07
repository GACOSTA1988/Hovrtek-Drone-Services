import { AuthContext } from "../../context";
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClientHomeToggle from '../../components/client/ClientHomeToggle.js';
import ClientHeader from '../../components/client/ClientHeader.js';
import ProjectList from './ProjectListScreen.js';
import NewProject from './NewProjectScreen.js';
// import Footer from '../components/Footer.js'
const Drawer = createDrawerNavigator();

export const ClientHomeScreen = ({ navigation }) => {

  // Conditional Rendering state for ProjectList / New Project Tab
  const [newProjectViewActive, setNewProjectViewAcitve ] = useState(false);
  const [projectsViewActive, setProjectsViewActive ] = useState(true);


const toggleProjectListState = () => {
setNewProjectViewAcitve(true)
setProjectsViewActive(false)
}

const toggleNewProjectState = () => {
setNewProjectViewAcitve(true)
setNewProjectViewAcitve(false)
}

const handleNewProjectView = () => {
  if (newProjectViewActive) {
    return <NewProject/>
  } else {
    return <ProjectList/>
  }
};
console.log(newProjectViewActive);

   return (
  <View style={styles.clientWrapper}>
    <ClientHeader/>
    <ClientHomeToggle
        toggleProjectListState={()=> toggleProjectListState()}
        toggleNewProjectState={()=> toggleNewProjectState()}
        />
          {handleNewProjectView()}
    <Text>Client Home Screen</Text>
    <Button title='Drawer' onPress={() => navigation.toggleDrawer()} />

  </View>
)};

const styles = StyleSheet.create({
  clientWrapper: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',
 
  },
  contentClientContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});
