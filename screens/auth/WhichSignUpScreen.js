import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Image, ImageBackground, Dimensions} from "react-native";
import hovrtekLogo from "../../assets/hovrtek_logo.png";
import landingPageImage from "../../assets/backgroundImage.jpg";
const windowHeight = Dimensions.get('window').height;

function WhichSignUpScreen({ navigation }) {
  return ( 
    <View style={styles.whichSignUpBody}>
      <ImageBackground source={landingPageImage} style={styles.MainContainer}>
        <View style={styles.opacityWrapper}>
          <Text style={styles.welcomeText}>Welcome {"\n"}To</Text>
          <Image source={hovrtekLogo} style={styles.hovrtekLogo} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push("PilotSignUpScreen");
            }}
          >
            <Text style={styles.buttonText}> Sign up as a pilot</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.push("ClientSignUpScreen");
            }}
          >
            <Text style={styles.buttonText}> Sign up as a client</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  whichSignUpBody: {
    alignItems: "center",
    backgroundColor: "rgb(36,36,36)",
    height: "100%",
  },
  MainContainer: {
    alignItems: "center",
    justifyContent: "flex-start",
    height: windowHeight,
    width: "100%",
    resizeMode: "contain",
  },
  opacityWrapper:{
    backgroundColor: "rgba(16,16,16, 0.4)",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  button: {
    marginTop: 20,
    padding: 10,
    width: "90%",
    alignItems: "center",
    backgroundColor: "#161616",
    borderRadius: 4,
  },
  buttonText: {
    color: "#DDE2E4",
    fontWeight: "600",
    alignItems: "center",
    fontSize: 20,
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "400",
    marginTop: "25%",
    color: "#DDE2E4",
  },

  hovrtekLogo: {
    height: 50,
    width: 280,
    marginBottom: "9%",
  },
});

export default WhichSignUpScreen;
