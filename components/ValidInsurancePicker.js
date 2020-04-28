import React, { Component, useState, useContext } from 'react';
import { Text, View, Button, Modal, StyleSheet, Dimensions, Picker, TouchableOpacity } from 'react-native';
import { PassSetInsuredStatus, PassInsuredStatusState } from '../screens/pilot/PilotProfileSetupPageOneScreen';

const ValidInsurancePicker = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)


    const setInsuredStatus = useContext(PassSetInsuredStatus)
    const insuredStatus = useContext(PassInsuredStatusState)

    console.log("DRONE TYPE", insuredStatus)

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
                        <Text style={styles.modalText}>What Type of drone do you have?</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={insuredStatus}
                            onValueChange={(insuredStatus, itemIndex) => setInsuredStatus(insuredStatus)}
                        >
                            <Picker.Item label="Yes" value="Yes" />
                            <Picker.Item label="No" value="No" />

                        </Picker>

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
            {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => openModal()}
                    title="Open modal"
                /> */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => openModal()}
                title={"Open modal"}
            >
                <Text style={styles.buttonText}>{insuredStatus}</Text>
            </TouchableOpacity>



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
        color: "white"
    }
});

export default ValidInsurancePicker