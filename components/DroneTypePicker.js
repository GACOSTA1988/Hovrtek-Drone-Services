import React, { Component, useState, useContext } from 'react';
import { Text, View, Button, Modal, StyleSheet, Dimensions, Picker, TouchableOpacity } from 'react-native';
import { PassSetDroneType, PassDroneTypeState } from '../screens/pilot/PilotProfileSetupPageOneScreen';
import { APP_STRINGS } from '../constants/index';

const DroneTypePicker = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [pickerValue, setPickerValue] = useState("Less than 1");

    const setDroneType = useContext(PassSetDroneType)
    const droneType = useContext(PassDroneTypeState)

    console.log("DRONE TYPE", droneType)

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    const renderDroneTypePickerButton = (buttonText = '') => {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={openModal}
            >
                <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        )
    }

    const renderDroneType = (hasDroneType = false) => {
        return hasDroneType
        ? renderDroneTypePickerButton(droneType)
        : renderDroneTypePickerButton(setDroneType('None'))
    };


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
    <Text style={styles.modalText}>{APP_STRINGS.modelDrone}</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={droneType}
                            onValueChange={(droneType, itemIndex) => setDroneType(droneType)}
                        >
                            <Picker.Item label="None" value="None" />
                            <Picker.Item label="Power Lord 3000" value="Power Lord 3000" />
                            <Picker.Item label="Power Lord 30001" value="Power Lord 30001" />
                            <Picker.Item label="The Drone Zone" value="The Drone Zone" />
                            <Picker.Item label="MegaDrone 12" value="MegaDrone 12" />
                            <Picker.Item label="Sky Master 50" value="Sky Master 50" />
                            <Picker.Item label="Lord of the Sky 21" value="Lord of the Sky 21" />
                            <Picker.Item label="Flown Drone" value="Flown Drone" />
                            <Picker.Item label="Drone Clone" value="Drone Clone" />
                            <Picker.Item label="The Drone Zone Advanced" value="The Drone Zone Advanced" />
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

            {renderDroneType(droneType)}

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

export default DroneTypePicker