import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import ClientHomeToggle from '../../components/client/ClientHomeToggle.js';
import ClientHeader from '../../components/client/ClientHeader.js';
import ProjectList from './ProjectListScreen.js';
import NewProject from './NewProjectScreen.js';
// import Footer from '../components/Footer.js'
import { Ionicons } from '@expo/vector-icons';

class ClientHomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      burgerPushed: false,
      newProjectViewActive: false,
      projectsViewActive: true
    };
    this.handlePushBurger = this.handlePushBurger.bind(this);
    this.toggleProjectListState = this.toggleProjectListState.bind(this);
  }

  toggleProjectListState= () => {
    this.setState(prevState => ({
      newProjectViewActive: true,
      projectsViewActive: false
    }));
  }

  toggleNewProjectState= () => {
    this.setState(prevState => ({
      newProjectViewActive: false,
      projectsViewActive: true
    }));
  }

  fart = () => {
    alert("tooooot")
  }

  handleNewProjectView() {
    return this.state.newProjectViewActive ? <NewProject/> :  <ProjectList/>
  }

  handlePushBurger() {
    this.props.navigation.toggleDrawer()
  }


  //  <ClientHeader fart={this.fart}/>
  render() {
console.log('new Project shown', this.state.newProjectViewActive); 
console.log('projects shown', this.state.projectsViewActive); 

   return (
    <View style={styles.clientWrapper}>

      <ClientHomeToggle
          toggleProjectListState={()=> this.toggleProjectListState()}
          toggleNewProjectState={()=> this.toggleNewProjectState()}
          />
      {this.handleNewProjectView()}
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

  // contentClientContainer: {
  //   marginTop: 20,
  //   alignItems: 'center',
  // },
});


export default ClientHomeScreen;