import * as React from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class FirebaseImagePicker extends React.Component {

    render() {

        return (
            <View >
                <Button title="Firebase Picker" onPress={this.pushIt} />
            </View>
        );
    }


componentDidMount() {
    this.getPermissionAsync();
}

getPermissionAsync = async () => {
    // alert('fired getPermission')
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.CAMERA);
}

pushIt = async () => {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();
 
    if (!result.cancelled) {
        this.uploadImage(result.uri, "test-image")
            .then(() => {
                Alert.alert("Success");
            })
            .catch((error) => {
                Alert.alert(error);
            });
    }
}

uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    console.log("---------------------", blob)
    
    var ref = firebase.storage().ref().child("images/" + imageName);
    return ref.put(blob);
}
}