import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import PropTypes from 'prop-types';

const ClientHeader = (props) => {
  console.warn(props);

  const navigation = useNavigation();

  return (
    <View style={styles.clientHeaderWrapper}>
      <View style={styles.headerText}></View>
      <Image
      source={hovrtekLogo}
      style={styles.hovrtekLogo}
      />
      <Ionicons style={styles.hamburger}
      onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}
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

ClientHeader.propTypes = {
  pushBurger: PropTypes.func.isRequired
}

export default ClientHeader
