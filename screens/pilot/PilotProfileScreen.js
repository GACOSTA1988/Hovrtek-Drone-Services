import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, StatusBar, Image, ScrollView, Button } from 'react-native';
import PilotHeader from '../../components/pilot/PilotHeader.js';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function PilotProfileScreen(props) {
  const navigation = useNavigation();

  // Hamburger menu push function. Works in android and not ios
  function handlePushBurger(e) {
    navigation.toggleDrawer();
  }

  return (
    <View style={styles.pilotWrapper}>
      <PilotHeader pushBurger={() => handlePushBurger()}/>
      <Text style={styles.contentPilotContainer}>Pilot profile page</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  pilotWrapper: {
    flex: 1,
    backgroundColor: 'lightgray',
    alignItems: 'center',

  },
  contentPilotContainer: {
    marginTop: 400,
    alignItems: 'center',
    fontSize: 50
  }
});
