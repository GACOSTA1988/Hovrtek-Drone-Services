import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import ClientHeader from '../../components/client/ClientHeader'

const ServicesScreen
 = ({ navigation }) => {


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
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 5
  },
  servicesText: {
      fontSize:20
  }
});

export default ServicesScreen

