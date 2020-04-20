import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import landingPageImage from "../../assets/landingPageImage.png";

function HomeImage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={landingPageImage} style={styles.backgroundImage}></Image>
      <Text style={styles.imageText}>PROFESSIONAL DRONE SERVICES</Text>

      <Text style={styles.imageTextTwo}>
        THE FASTEST WAY TO GET AERIAL IMAGES AND DATA
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", width: "110%" },
  backgroundImage: {
    // marginTop:
    flex: 1,
    // height: "100%",
    // width: "100%",
    position: "absolute",
  },
  imageText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginTop: "40%",
    marginLeft: 10,
  },
  imageTextTwo: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#3E90D0",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 100,
    marginLeft: 10,
  },
});

export default HomeImage;
