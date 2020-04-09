import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";
import PilotHeader from '../../components/pilot/PilotHeader';
import Jobs from '../../components/pilot/Jobs';

export const PilotHome = ({ navigation }) => (
  <View style={styles.container}>
    <PilotHeader/>
    <Text>Pilot Home Screen</Text>
    <Button title='Drawer' onPress={() => navigation.toggleDrawer()} />
    <Jobs />
  </View>
);

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
