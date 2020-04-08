
import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import ClientHomeToggle from '../../components/client/ClientHomeToggle.js';
import ClientHeader from '../../components/client/ClientHeader.js';
import ProjectList from './ProjectListScreen.js';
import NewProject from './NewProjectScreen.js';
// import Footer from '../components/Footer.js'
import { useNavigation } from '@react-navigation/native';





const ClientHomeScreen = ({ navigation }) => {

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
  return newProjectViewActive ? <NewProject/> :  <ProjectList/>
}

   return (
  <View style={styles.clientWrapper}>
    <ClientHeader/>

    <ClientHomeToggle
        toggleProjectListState={()=> toggleProjectListState()}
        toggleNewProjectState={()=> toggleNewProjectState()}
        />
          {handleNewProjectView()}

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


export default ClientHomeScreen