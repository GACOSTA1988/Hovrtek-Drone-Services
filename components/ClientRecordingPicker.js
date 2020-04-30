import React, { useState, useContext } from 'react';
import { Text, View, Button, Modal, StyleSheet, Picker, TouchableOpacity, TextInput, Alert } from 'react-native';
import { PassSetRecording, PassRecordingState } from '../screens/client/NewProjectScreen';
import { useNavigation } from "@react-navigation/native";

const ClientRecordingPicker = () => {

    const navigation = useNavigation();
    const [isModalVisible, setIsModalVisible] = useState(false)

    const setRecording = useContext(PassSetRecording)
    const recordingState = useContext(PassRecordingState)

    console.log("LOCATION", recordingState)


    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);

    }

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType={'slide'}
                onRequestClose={() => closeModal()}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <Text style={styles.modalText}>What will you be recording?</Text>
                    </View>
                    <View>
                        <TextInput
                            style={{

                                height: 30,
                                borderColor: "gray",
                                borderWidth: 1,

                            }}
                            onChangeText={setRecording}
                            value={recordingState}
                        />

                    </View>
                    <View styles={styles.cancelWrapper}>
                        <Button
                            onPress={() => closeModal()}
                            title={"Choose"}
                        >
                        </Button>
                    </View>
                </View>
            </Modal>


            {

                (recordingState)
                    ?
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>{recordingState}</Text>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>Please Set Location
                        </Text>
                    </TouchableOpacity>)
            }





        </View>
    );
}

const styles = StyleSheet.create({

    modalContainer: {
        height: 300,
        justifyContent: 'center',
        paddingTop: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        marginTop: 200,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5

    },
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        height: 50,
        width: 150,

    },
    modalText: {
        fontSize: 20
    },
    cancelWrapper: {
    },
    button: {
        width: 250,
        height: 50,
        backgroundColor: "#092455",
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30,
        color: 'white'
    },
    buttonText: {
        color: "white",
        fontSize: 20
    }
});

export default ClientRecordingPicker