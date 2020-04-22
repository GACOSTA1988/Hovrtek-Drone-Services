import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import ClientHeader from '../../components/client/ClientHeader';
import sunsetDrone from '../../assets/sunsetDrone.png';

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={sunsetDrone} style={styles.backgroundImage}></Image>
      <Text style={styles.header}>DRONE PHOTOGRAPHY AND VIDEO</Text>
      <Text style={styles.body}>Hovrtek is a drone company that specializes in capturing <Text style={styles.boldText}>cost-effective images, video, and data</Text> with sUAS (Small Unmanned Aircraft Systems) for analysis, surveying, mapping, and more. We are constantly exploring ways to help our clients save time and money with software and drones.  All of our pilots are <Text style={styles.boldText}>FAA licensed and insured</Text> to complete aerial missions.</Text>
    </View>
  )
};

const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 100,
    margin: 30
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    height: "140%",
    width: "120%"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    color: "white"
  },
  body: {
    fontSize: 20,
    color: "white"
  },
  boldText: {
    fontWeight: "bold"
  }
});

export default AboutScreen;
