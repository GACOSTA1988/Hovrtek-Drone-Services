import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

const PilotHeader = (props) => {
  console.warn(props);
  console.warn("these are the props in header: ");

  return (
    <View style={styles.clientHeaderWrapper}>
      <View style={styles.headerText}></View>
      <Image
      source={hovrtekLogo}
      style={styles.hovrtekLogo}
      />
      <Ionicons style={styles.hamburger}
      onPress={() => props.pushBurger()}
        name="ios-menu"
        size={45}
        color="white"
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  clientHeaderWrapper: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 25,
  backgroundColor: '#092455'
  },
  hamburger: {
    alignSelf:'flex-end',
    margin: 5
  },
  hovrtekLogo: {
    width: 170,
    height: 30,
    position: 'absolute',
    left: 5,
    right: 0,
    top: 13,
    }
});

PilotHeader.propTypes = {
  pushBurger: PropTypes.func.isRequired
}

export default PilotHeader;
