import React from "react";
import { Text, View, StyleSheet, Header, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Linking } from 'expo';

const Footer = () => {

  function goToLinkedin() {
    Linking.openURL('https://www.linkedin.com/company/hovrtek/');
  }

  function goToFacebook() {
    Linking.openURL('https://www.facebook.com/Hovrtek/');
  }

  function goToInstagram() {
    Linking.openURL('https://www.instagram.com/hovrtek/');
  }

  return (
    <View style={styles.footerWrapper}>
      <View style={styles.mediaButton}>
        <TouchableOpacity onPress={goToLinkedin}>
          <Icon
            name="facebook"
            size={30}
            style={styles.icon}
            color="white">
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToInstagram}>
          <Icon
            name="instagram"
            size={30}
            color="white"
            style={styles.icon}>
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToFacebook}>
          <Icon name="linkedin"
            size={35}
            style={styles.icon}
            color="white">
          </Icon>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// todo: figure out how to put margins on icons
const styles = StyleSheet.create({
  footerWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#092455",
    height: 90,
    borderTopColor: "grey",
    borderTopWidth: 10
  },
  mediaButton: {
    alignItems: "center",
    paddingLeft: '25%',
    flexDirection: 'row'
  },
  icon: {
    margin: 20
  },
  space: {
    color: "#092455"
  }
});

export default Footer;
