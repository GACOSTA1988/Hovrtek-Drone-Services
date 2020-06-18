import React, { useEffect, useState } from "react";
import { View, StyleSheet, Header, Image, TouchableOpacity, Keyboard, Alert } from "react-native";

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

  return (
    <View style={styles.footerWrapper}>
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: "#092455",
    height: 0,
    margin: 0,
    padding: 0,
  },
});

export default Footer;
