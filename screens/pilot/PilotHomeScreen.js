import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PilotHeader from '../../components/pilot/PilotHeader.js';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import PropTypes from 'prop-types';

export default function PilotHomeScreen(props) {
  const navigation = useNavigation();

  // Hamburger menu push function. Works in android and not ios
  // function handlePushBurger(e) {
  //   navigation.dispatch(DrawerActions.openDrawer())
  // }

  return (
    <View style={styles.pilotWrapper}>
      <PilotHeader pushBurger={() => navigation.dispatch(DrawerActions.openDrawer())}/>
      <Text style={styles.contentPilotContainer}>Pilot home page</Text>
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
