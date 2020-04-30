import React, { useState, useEffect } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Button,
    Alert,
    ScrollView,
} from "react-native";
import { postProjects } from "../../actions/index";
import { postClientProfiles } from "../../actions/index";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import ImageUploader from "../../components/client/ImageUploader";
import * as firebase from "firebase";
import ClientDatePicker from '../../components/ClientDatePicker';


// CONTEXT HOOK FOR MODAL FORMS


function NewProjectScreenThree(props, { postProjects }) {
    const navigation = useNavigation();
    let clientID = null;
    if (firebase.auth().currentUser) {
        clientID = firebase.auth().currentUser.uid;
    }






    return (
        <View style={styles.newProjectListWrapper}>
            <ScrollView>
                <TouchableOpacity style={styles.newProjectListTextWrapper}>

                    <Text style={styles.newProjectText}>Create a New Project</Text>

                    <Text style={styles.labelText}>
                        Here is a question.
          </Text>
                    <View style={styles.modalWrapper}>
                        <Text>Here's where you answer</Text>
                    </View>

                    <Text style={styles.labelText}>
                        What is the date of your Drone shoot?
          </Text>
                    <View style={styles.modalWrapper}>
                        <PassSetDate.Provider value={setDate}>
                            <PassDateState.Provider value={date}>
                                <ClientDatePicker />
                            </PassDateState.Provider>
                        </PassSetDate.Provider>
                    </View>

                    <Text style={styles.labelText}>
                        What will the Drone Service be recording?
          </Text>
                    <View style={styles.modalWrapper}>
                        <PassSetRecording.Provider value={setRecording}>
                            <PassRecordingState.Provider value={recording}>
                                <ClientRecordingPicker />
                            </PassRecordingState.Provider>
                        </PassSetRecording.Provider>
                    </View>

                    <Text style={styles.labelText}>
                        Do you have any light specification?
          </Text>
                    <View style={styles.modalWrapper}>
                        <PassSetLight.Provider value={setLight}>
                            <PassLightState.Provider value={light}>
                                <ClientLightPicker />
                            </PassLightState.Provider>
                        </PassSetLight.Provider>
                    </View>

                    <TouchableOpacity onPress={submit}>
                        <Text style={styles.submitButton}>Submit Form</Text>
                    </TouchableOpacity>
                    {/* <Button style={styles.submitButton} title="Submit" onPress={submit} /> */}
                </TouchableOpacity>
                <Text style={styles.dummyText}>Dummy Text</Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    newProjectListWrapper: {
        alignItems: "center",
    },
    newProjectListForm: {
        backgroundColor: "darkgray",
        width: 380,
        borderWidth: 1,
        padding: 6,
    },
    newProjectText: {
        fontSize: 30,
        color: "darkblue",
        marginBottom: 20,
        textAlign: "center",
        marginTop: 10,
    },
    newProjectListTextWrapper: {
        // marginBottom: 100
    },
    input: {
        borderWidth: 1,
        borderRadius: 3,
        height: 30,
        marginBottom: 50
    },
    imageButton: {
        height: 30,
        width: 20,
        marginBottom: 1000,
        backgroundColor: "red",
    },
    labelText: {
        marginBottom: 10,
        textAlign: "center",
    },
    uploaderText: {
        marginTop: 100,
    },
    dummyText: {
        marginTop: 200,

        color: 'lightgray'
    },
    submitButton: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: "center",
        fontSize: 30,
        color: "#092455",
    },
    modalWrapper: {
        alignItems: 'center'
    }
});

export default connect(null, { postProjects })(NewProjectScreenThree);
