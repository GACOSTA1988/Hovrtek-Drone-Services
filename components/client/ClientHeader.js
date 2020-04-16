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

const ClientHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.clientHeaderWrapper}>
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
  clientHeaderWrapper: {
    marginTop: 18,
    marginBottom: 20,
    backgroundColor: "#092455",
    width: 425,
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
    top: 7,
    marginLeft: 20
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
//   clientHeaderWrapper: {
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

export default ClientHeader;
