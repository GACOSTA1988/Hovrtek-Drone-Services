import React from "react";
import { Text, View, StyleSheet, Header, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Footer = () => {
  return (
    <View style={styles.footerWrapper}>
      <Text style={styles.mediaButton}>
        <Icon
          name="facebook"
          size={30}
          color="white"
          style={{ marginRight: 10 }}
        ></Icon>
        <Text style={styles.space}>***</Text>
        <Icon
          name="instagram"
          size={30}
          color="white"
          style={styles.icon}
        ></Icon>
        <Text style={styles.space}>***</Text>
        <Icon name="linkedin" size={35} color="white"></Icon>
      </Text>
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
    textAlign: "center",
    paddingTop: 20
  },
  icon: {
    margin: 60
  },
  space: {
    color: "#092455"
  }
});

export default Footer;
