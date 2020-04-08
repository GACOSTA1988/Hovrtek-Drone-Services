import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import ClientHomeToggle from '../../components/client/ClientHomeToggle.js';
import ClientHeader from '../../components/client/ClientHeader.js';
import ProjectList from './ProjectListScreen.js';
import NewProject from './NewProjectScreen.js';
// import Footer from '../components/Footer.js'
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

class ClientHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      burgerPushed: false,
    };
    this.handlePushBurger = this.handlePushBurger.bind(this);
  }

  // Conditional Rendering state for ProjectList / New Project Tab

  // [ newProjectViewActive, setNewProjectViewAcitve ] = useState(false);
  // [ projectsViewActive, setProjectsViewActive ] = useState(true);
  //
  // toggleProjectListState() {
  //   setNewProjectViewAcitve(true)
  //   setProjectsViewActive(false)
  // }
  //
  // toggleNewProjectState() {
  //   setNewProjectViewAcitve(true)
  //   setNewProjectViewAcitve(false)
  // }

  handleNewProjectView() {
    return newProjectViewActive ? <NewProject/> :  <ProjectList/>
  }

  handlePushBurger() {
    this.props.navigation.toggleDrawer()
  }

  render() {
   return (
    <View style={styles.clientWrapper}>
      <ClientHeader pushBurger={this.handlePushBurger}/>
      <ClientHomeToggle
          toggleProjectListState={()=> this.toggleProjectListState()}
          toggleNewProjectState={()=> this.toggleNewProjectState()}
          />

      <Button title='Drawer' onPress={() => this.props.navigation.toggleDrawer()} />

    </View>
  )
  }
};

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


export default ClientHomeScreen;
