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

  // function goToLinkedin() {
  //   Linking.openURL('https://www.linkedin.com/company/hovrtek/');
  // }

  // function goToFacebook() {
  //   Linking.openURL('https://www.facebook.com/Hovrtek/');
  // }

  // function goToInstagram() {
  //   Linking.openURL('https://www.instagram.com/hovrtek/');
  // }

  return (
    <View>
      { visible ? (
        <View style={styles.footerWrapper}>
          {/* <View style={styles.mediaButton}>
            <TouchableOpacity onPress={goToLinkedin}>
              <Icon name="linkedin"
              size={35}
              style={styles.icon}
              color="white">
              </Icon>
            </TouchableOpacity>
            <TouchableOpacity onPress={goToFacebook}>
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
          </View> */}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: "#092455",
    height: 34,
    margin: 0,
    padding: 0,
  },
});

export default Footer;
