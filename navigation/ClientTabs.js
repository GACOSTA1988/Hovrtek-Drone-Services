import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClientHomeStackNavigator from "./ClientHomeStackNavigator";
import ClientProjectStackNavigator from "./ClientProjectStackNavigator";
import MessagingNavigation from './MessagingNavigation';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import * as firebase from "firebase";
import { getMessages } from "../actions/messages";
import { connect } from "react-redux";
import _ from "lodash";
// import { Entypo } from '@expo/vector-icons';

function ClientTabs(props) {
  const Tabs = createBottomTabNavigator();

  useEffect(() => {
    props.getMessages();
  }, []);

  let userID = null;
  let unreadMessages = [];
  const [ noteVisible, setNoteVisible ] = useState(false);
  if (firebase.auth().currentUser && props.listOfMessages) {
    userID = firebase.auth().currentUser.uid;
    props.listOfMessages.forEach((message) => {
      if (message.userTwoID === userID && !message.read) {
        if (!unreadMessages.includes(message)) {
          unreadMessages.push(message);
        }
      }
    });
  }

  return (
      <Tabs.Navigator tabBarOptions={{activeBackgroundColor: 'lightblue', inactiveBackgroundColor: '#092455', activeTintColor: '#092455', inactiveTintColor: 'white', showLabel: false}}>
        <Tabs.Screen 
          name="Home" 
          labelStyle={ {color: 'white'}}
          component={ClientHomeStackNavigator} 
          options={{
            tabBarIcon: ({color}) => (<FontAwesome name="home" size={24} color={color} />),
          }}
          />
        <Tabs.Screen 
          name="Projects" 
          component={ClientProjectStackNavigator}
          options={{
            tabBarIcon: ({color}) => (<FontAwesome5 name="helicopter" size={20} color={color}/>)
          }} />
        <Tabs.Screen 
          name="Messages" 
          component={MessagingNavigation}
          options={unreadMessages.length > 0 ? {
            tabBarIcon: ({color}) => (<Ionicons name="md-mail-unread" size={24} color={color} />) } : {
              tabBarIcon: ({color}) => (<Ionicons name="md-mail" size={24} color={color} />) } }
              // <Entypo name="message" size={24} color={color}/>

        />
      </Tabs.Navigator>
  );
}

function mapStateToProps(state) {
  const listOfMessages = _.map(state.messagesList.messagesList, (val, key) => {
    return {
      ...val,
      key: key,
    };
  });
  return {
    listOfMessages,
  };
}

export default connect(mapStateToProps, {
  getMessages })(ClientTabs);