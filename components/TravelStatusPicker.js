import React, { useState, useContext } from 'react';
import { Text, View, Button, Modal, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { PassSetTravelStatus, PassTravelStatusState } from '../screens/pilot/PilotProfileSetupPageTwoScreen';

const TravelStatusPicker = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)


    const setTravelStatus = useContext(PassSetTravelStatus)
    const travelStatus = useContext(PassTravelStatusState)

    console.log("TRAVEL STATUS", travelStatus)

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
                        <Text style={styles.modalText}>Are You Willing to Travel Out of State for a Drone Job?</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={travelStatus}
                            onValueChange={(travelStatus, itemIndex) => setTravelStatus(travelStatus)}
                        >
                            <Picker.Item label="No" value="No" />
                            <Picker.Item label="Yes" value="Yes" />

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




            {
                (travelStatus)
                    ?
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>{travelStatus}</Text>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>Not Willing to Travel{setTravelStatus("No")}
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

export default TravelStatusPicker