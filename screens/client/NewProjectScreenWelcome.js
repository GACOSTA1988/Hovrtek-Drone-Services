import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image, 
    TouchableOpacity
} from "react-native";
import { StatusBar } from 'react-native'

import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import hovrtekLogo from '../../assets/hovrtek_logo.png';
import ClientSubheader from '../../components/client/ClientSubheader'


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

                    <ClientSubheader />


            <Text style={styles.welcomeText}>Welcome to</Text>
            <View style={styles.HeaderWrapper}>
                <Image source={hovrtekLogo} style={styles.hovrtekLogo} />
            </View>
            <Text style={styles.bodyTextOne}>Press the button below to create a new project.</Text>
            <Text style={styles.bodyTextTwo}>Upon completion, your project will be transmitted to Hovrtek's pool of FAA Certified Pilots ready to take the job!</Text>
            <TouchableOpacity style={styles.continueButton} onPress={continueButton}>
                <Text style={styles.buttonText}>Create a Project</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    newProjectListWrapper: {
        alignItems: "center",
        marginTop: 15
    },
    hovrtekLogo: {
        width: 320,
        height: 60,
        alignSelf: 'center',
        position: 'absolute',
        top: 10,
        tintColor: '#092455'
    },
    welcomeText: {
        fontSize: 30,
        marginTop: 40,
    },
    bodyTextOne: {
        marginTop: 100
    },
    continueButton: {
        width: 250,
        height: 50,
        backgroundColor: "#092455",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontSize: 20
    },
});

export default NewProjectScreenWelcome
