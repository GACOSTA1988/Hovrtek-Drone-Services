import React, { useEffect, useState } from "react";
import { View, StyleSheet, Header, Image, TouchableOpacity, Keyboard, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Linking } from 'expo';

function Footer() {

  const [visible, setVisible] = useState(true);

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  function _keyboardDidShow() {
    setVisible(false);
  }

  function _keyboardDidHide() {
    setVisible(true);
  }

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
    <View>
      { visible ? (
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
      ) : (
        <View></View>
      )}
    </View>
  );
};

// todo: figure out how to put margins on icons
const styles = StyleSheet.create({
  footerWrapper: {
    // position: "absolute",
    // left: 0,
    // right: 0,
    // bottom: 0,
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
