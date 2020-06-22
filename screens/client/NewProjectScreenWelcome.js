import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image, 
    TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import hovrtekLogo from '../../assets/hovrtek_logo.png';


function NewProjectScreenWelcome(props) {


    const navigation = useNavigation();
    let clientID = null;
    if (firebase.auth().currentUser) {
        clientID = firebase.auth().currentUser.uid;
    }

    const continueButton = () => {
        navigation.navigate("NewProjectScreenOne");
    }

    return (
        <View style={styles.newProjectListWrapper}>
            <Text style={styles.welcomeText}>Welcome to</Text>
            <View style={styles.HeaderWrapper}>
                <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
            </View>
            <Text style={styles.bodyTextOne}>Press the button below to create a new project</Text>
            <Text style={styles.bodyTextTwo}>Upon submission, your project will be available to Hovrtek's pool of FAA Certified Pilots</Text>
            <TouchableOpacity style={styles.continueButton} onPress={continueButton}>
                <Text style={styles.buttonText}>Create a Project</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    newProjectListWrapper: {
        alignItems: "center",
        paddingTop: "5%",
        height: "100%",
        backgroundColor: "#161616"
    },
    hovrtekLogo: {
        width: 320,
        height: 60,
        alignSelf: 'center',
        position: 'absolute',
        top: 10,
        tintColor: '#A8C7BC'
    },
    welcomeText: {
        fontSize: 30,
        marginTop: 40,
        color: "#DDE2E4"
    },
    bodyTextOne: {
        marginTop: 100,
        textAlign: 'center',
        color: "#DDE2E4"
    },
    bodyTextTwo: {
        marginTop: 10,
        textAlign: 'center',
        color: "#DDE2E4"
    },
    continueButton: {
        width: 250,
        height: 50,
        backgroundColor: "#DDE2E4",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 30
    },
    buttonText: {
        color: '#161616',
        fontSize: 20
    },
});

export default NewProjectScreenWelcome
