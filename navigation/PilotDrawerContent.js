import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import SignOutScreen from '../screens/auth/SignOutScreen';


function PilotDrawerContent() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{marginLeft: 5}}>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => this.props.navigation.navigate('PilotTabs')}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => this.props.navigation.navigate('Profile')}
          >
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => this.props.navigation.navigate('About')}
          >
            <Text>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={{marginTop: 20}}
          onPress={() => this.props.navigation.navigate('Support')}
          >
            <Text>Support</Text>
          </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
      style={{marginTop: 20, marginLeft: 5}}
      onPress={() => SignOutScreen()}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default PilotDrawerContent;