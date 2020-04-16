import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ClientHeader from '../../components/client/ClientHeader'

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>About Screen</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  }
});

export default AboutScreen;
