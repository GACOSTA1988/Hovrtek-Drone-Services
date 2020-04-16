import React from "react";
import {
  View,
  StyleSheet,
  Header,
  Image,
  ShadowPropTypesIOS,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import hovrtekLogo from "../../assets/hovrtek_logo.png";

import { useNavigation, DrawerActions } from "@react-navigation/native";

const PilotHeader = () => {
  const navigation = useNavigation();
  console.log(navigation);

  return (
    <View style={styles.pilotHeaderWrapper}>
      <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
      <Ionicons
        style={styles.hamburger}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}
        name="ios-menu"
        size={45}
        color="white"
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pilotHeaderWrapper: {
    marginTop: 18,
    backgroundColor: "#092455",
    width: 375,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  hovrtekLogo: {
    width: 170,
    height: 30,
    position: "absolute",
    left: 0,
    right: 10,
    top: 7
  },

  hamburger: {
    alignSelf: "flex-end",
    marginLeft: 300,
    margin: 0
  }
});

// Android-compatible styling - todo: conditional rendering

// const width = Dimensions.get('window').width;
//
// const styles = StyleSheet.create({
//   pilotHeaderWrapper: {
//     backgroundColor: '#092455',
//     left: -16,
//     top: 5,
//     alignSelf: 'stretch',
//     width: width,
//     height: 67,
//   },
//   hovrtekLogo: {
//     width: 170,
//     height: 30,
//     position: 'absolute',
//     left: 10,
//     top: 20,
//   },
//
//   hamburger: {
//     alignSelf:'flex-end',
//     right: 10,
//     top: 10
//   }
// });

export default PilotHeader;
