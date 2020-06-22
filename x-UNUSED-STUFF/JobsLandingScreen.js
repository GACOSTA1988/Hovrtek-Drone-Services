// // NOT WIRED UP - THIS MAY BE REPLACED WITH A MODAL / POP UP

// import React, { useState, useEffect } from "react";
// import {
//     Text,
//     View,
//     StyleSheet,
//     Image,
//     TouchableOpacity
// } from "react-native";

// import { connect } from "react-redux";
// import { useNavigation } from "@react-navigation/native";
// import * as firebase from "firebase";
// import hovrtekLogo from '../../assets/hovrtek_logo.png';


// function JobsLandingScreen(props) {
//     const navigation = useNavigation();
//     let clientID = null;
//     if (firebase.auth().currentUser) {
//         clientID = firebase.auth().currentUser.uid;
//     }

//     const continueButton = () => {
//         navigation.navigate("JobListScreen");
//     }

//     return (
//         <View style={styles.newProjectListWrapper}>
//             <Text style={styles.welcomeText}>Welcome to</Text>
//             <View style={styles.HeaderWrapper}>
//                 <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
//             </View>
//             <Text style={styles.bodyTextOne}>Please complete your Pilot profile to be eligable to accept Drone jobs. You can do this by navigating to the Profile tab in the upper right hand corner of the app.</Text>
//             <Text style={styles.bodyTextTwo}>Press the button below to browse available Drone jobs.</Text>
//             <TouchableOpacity style={styles.continueButton} onPress={continueButton}>
//                 <Text style={styles.buttonText}>Browse Jobs</Text>
//             </TouchableOpacity>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     newProjectListWrapper: {
//         alignItems: "center",
//         padding: 8
//     },
//     hovrtekLogo: {
//         width: 320,
//         height: 60,
//         alignSelf: 'center',
//         position: 'absolute',
//         top: 10,
//         tintColor: '#161616'
//     },
//     welcomeText: {
//         fontSize: 30,
//         marginTop: 30,
//     },
//     bodyTextOne: {
//         marginTop: 90
//     },
//     bodyTextTwo: {
//         marginTop: 9
//     },
//     continueButton: {
//         width: 250,
//         height: 50,
//         backgroundColor: "#161616",
//         borderRadius: 30,
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 40,
//         marginBottom: 30
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 20
//     },
// });

// export default JobsLandingScreen
