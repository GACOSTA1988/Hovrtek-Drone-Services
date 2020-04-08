import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import hovrtekLogo from '../../assets/hovrtek_logo.png';

const AuthHeader = ({ navigation }) => {

  return (
    <View style={styles.clientHeaderWrapper}>
      <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
    </View>
  )
}

const styles = StyleSheet.create({
  clientHeaderWrapper: {
  position: 'absolute',
  left: 0,
  right: 0,
  top: 24,
  backgroundColor: '#092455',
  height: 110
  },
  hovrtekLogo: {
    width: 240,
    height: 45,
    alignSelf: 'center',
    position: 'absolute',
    top: 30
  }
});

export default AuthHeader;
