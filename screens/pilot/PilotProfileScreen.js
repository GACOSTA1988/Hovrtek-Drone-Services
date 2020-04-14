import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../context";

const PilotProfileScreen = ({ navigation }) => {
  const { signOut } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text>Pilot Profile Screen</Text>
      <Button title="Sign Out" onPress={() => signOut()} />
    </View>
  );
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

export default PilotProfileScreen;
