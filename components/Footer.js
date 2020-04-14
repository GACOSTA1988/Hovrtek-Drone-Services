import React from 'react';
import { Text, View, StyleSheet, Header, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Footer = () => {

  return (
    <View style={styles.footerWrapper}>
      <Text style={styles.mediaButton}>
        <Icon name="facebook"
          size={20}
          color="white">
        </Icon>
        <Icon name="instagram"
          size={20}
          color="white"
          style={styles.icon}>
        </Icon>
        <Icon name="linkedin"
          size={20}
          color="white">
        </Icon>
      </Text>
    </View>
  )
}

// todo: figure out how to put margins on icons
const styles = StyleSheet.create({
  footerWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#092455',
    height: 60
  },
  mediaButton: {
    textAlign: 'center',
    paddingTop: 20,
  },
  icon: {
    margin: 60,
  }

});

export default Footer;
