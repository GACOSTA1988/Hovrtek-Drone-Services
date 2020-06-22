import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import sunsetDrone from '../assets/sunsetDrone.png';
import sunsetDroneClean from "../assets/sunsetDroneClean.jpg";
import { Entypo } from '@expo/vector-icons'; 
import {Linking} from 'expo';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={sunsetDroneClean} style={styles.backgroundImage}></Image>
      <View style={styles.textWrapper} >
        <Text style={styles.header}>DRONE PHOTOGRAPHY AND VIDEO</Text>
        <Text style={styles.body}>Hovrtek is a drone company that specializes in capturing <Text style={styles.boldText}>cost-effective images, video, and data</Text> with sUAS (Small Unmanned Aircraft Systems) for analysis, surveying, mapping, and more. We are constantly exploring ways to help our clients save time and money with software and drones.  All of our pilots are <Text style={styles.boldText}>FAA licensed and insured</Text> to complete aerial missions.</Text>
        <View style={styles.socialMediaContainer}>
          <Entypo name="facebook" size={35} color="white" onPress={() => Linking.openURL('https://www.facebook.com/Hovrtek/')} />
          <Entypo name="instagram" size={35} color="white" onPress={() => Linking.openURL('https://www.instagram.com/hovrtek/')} />
          <Entypo name="linkedin" size={35} color="white" onPress={() => Linking.openURL('https://www.linkedin.com/company/hovrtek/')} />
        </View>
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  textWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: 'rgba(16,16,16, 0.5)',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    height: "140%",
    width: "120%"
  },
  header: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },
  body: {
    marginTop: 10,
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold"
  }
});
export default AboutScreen;