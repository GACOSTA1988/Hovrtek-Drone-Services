import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import sunsetDrone from "../../assets/sunsetDrone.png";

const SupportScreen = () => {

  return (
    <View style={styles.container}>
      <Image source={sunsetDrone} style={styles.backgroundImage}></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.h1}>SUPPORT</Text>
        <Text style={styles.h2}>
          If you have any questions or concerns regarding Hovrtek, Please call
          Prince between the hours of 2am and 4am. Thank you.
        </Text>

        <Text style={styles.h3}>HOVRTEK HEADQUARTERS</Text>
        <Text style={styles.h3}>2536 NW Upshur St Unit B</Text>
        <Text style={styles.h3}>Portland, OR 97210</Text>
        <Text style={styles.h3}>(503) 610-8914</Text>
        <Text style={styles.h3}>hello@hovrtek.com</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  h1: {
    fontSize: 30,
    marginTop: "40%",
    marginBottom: 20,
    fontWeight: "600",
    color: "white",
  },
  h2: {
    marginBottom: 50,
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    margin: 5,
  },
  h3: {
    marginTop: 0,
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
});

export default SupportScreen;
