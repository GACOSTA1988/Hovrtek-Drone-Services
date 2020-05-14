import React, { useState, useContext } from 'react';
import { Text, View, Button, Modal, StyleSheet, Picker, TouchableOpacity } from 'react-native';
import { PassSetAirMap, PassAirMapState } from '../screens/pilot/PilotProfileSetupPageTwoScreen';
import * as firebase from "firebase";
import { APP_STRINGS } from '../constants/index';

const AirMapPicker = () => {

    const [isModalVisible, setIsModalVisible] = useState(false)


    const setAirMap = useContext(PassSetAirMap)
    const airMap = useContext(PassAirMapState)

    console.log("AIR MAP", airMap)

    const openModal = () => {
        setIsModalVisible(true);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    }

    let userID = null;
    if (firebase.auth().currentUser) {
        userID = firebase.auth().currentUser.uid;
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
                        <Text style={styles.modalText}>{APP_STRINGS.experienceFlying}}</Text>
                    </View>
                    <View>
                        <Picker
                            selectedValue={airMap}
                            onValueChange={(airMap, itemIndex) => setAirMap(airMap)}
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
                (airMap)
                    ?
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>{airMap}</Text>
                    </TouchableOpacity>)
                    :
                    (<TouchableOpacity
                        style={styles.button}
                        onPress={() => openModal()}
                        title={"Open modal"}
                    >
                        <Text style={styles.buttonText}>Not Willing to Travel{setAirMap("No")}
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

export default AirMapPicker