import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import sunsetDroneClean from "../assets/sunsetDroneClean.jpg";
import { Entypo } from '@expo/vector-icons'; 
import {Linking} from 'expo';


const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={sunsetDroneClean} style={styles.backgroundImage}></Image>
      <View style={styles.textWrapper}>
        <Text style={styles.h2}>
        If you have any questions or concerns, feel free to contact us. Email is our preferred method of communication. Thank you.
        </Text>
        <Text style={styles.h3}>HOVRTEK HEADQUARTERS</Text>
        <Text style={styles.h3}>2536 NW Upshur St Unit B</Text>
        <Text style={styles.h3}>Portland, OR 97210</Text>
        <Text style={styles.h3}>(503) 610-8914</Text>
        <Text style={styles.h3}>hello@hovrtek.com</Text>
        <View style={styles.socialMediaContainer}>
          <Entypo name="facebook" size={35} color="white" onPress={() => Linking.openURL('https://www.facebook.com/Hovrtek/')} />
          <Entypo name="instagram" size={35} color="white" onPress={() => Linking.openURL('https://www.instagram.com/hovrtek/')} />
          <Entypo name="linkedin" size={35} color="white" onPress={() => Linking.openURL('https://www.linkedin.com/company/hovrtek/')} />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(16,16,16, 0.5)',
    paddingVertical: 50,
    paddingHorizontal: 15,
  },
  socialMediaContainer: {
    flexDirection: "row",
    width: "100%",
    height: 40,
    marginTop: 25,
    justifyContent: "space-evenly",
    paddingHorizontal: "10%",
    alignItems: "center",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  h1: {
    fontSize: 30,
    fontWeight: "600",
    color: "white",
  },
  h2: {
    textAlign: "center",
    fontWeight: "600",
    color: "white",
    marginVertical: 20,
  },
  h3: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },
});
export default SupportScreen;