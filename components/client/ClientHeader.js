import React from 'react';
import { Text, View, StyleSheet, Header, Image, ShadowPropTypesIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';


const ClientHeader = ({navigation}) => {

//  const openBurger = () => {
//  alert('fart')
// }


  return (

  <View style={styles.clientHeaderWrapper}>
      <View style={styles.headerText}></View>
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

// onPress={() => navigation.toggleDrawer()}
// const openBurger = () => {
//   navigation.toggleDrawer()
// }

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

export default ClientHeader
