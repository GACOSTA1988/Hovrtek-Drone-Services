import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ServicesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.servicesText}>Services Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  servicesText: {
    fontSize:20
  }
});

export default ServicesScreen;
