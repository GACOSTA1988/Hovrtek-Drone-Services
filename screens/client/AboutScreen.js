import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import ClientHeader from '../../components/client/ClientHeader'

const AboutScreen = ({ navigation }) => {
  

  return (
    <View style={styles.container}>
      <ClientHeader />
      <Text>About Screen</Text>
      <Button title='Drawer' onPress={() => navigation.toggleDrawer()} />
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

export default AboutScreen