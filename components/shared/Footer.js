import React, { useEffect, useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";

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
    <View>
      { visible ? (
        <View style={styles.footerWrapper}>
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: "#161616",
    height: 34,
    margin: 0,
    padding: 0,
  },
});

export default Footer;