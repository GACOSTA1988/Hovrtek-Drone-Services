import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';

const PilotHeader = ({navigation}) => {

  return (
    <View style={styles.clientHeaderWrapper}>
      <Image
      source={hovrtekLogo}
      style={styles.hovrtekLogo}
      />
      <Ionicons style={styles.hamburger}
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
  top: 0,
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
    top: 13
  }
});

export default PilotHeader;
