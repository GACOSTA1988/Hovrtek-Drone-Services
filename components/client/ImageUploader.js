import * as React from 'react';
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

export default class ImageUploader extends React.Component {
    state = {
        image: null,
    };

    render() {
        let { image } = this.state;
        return (
            <View >
                <Button title="Upload Image" onPress={this.pushIt} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
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
                    Alert.alert("Successfully Uploaded to the Hovrtek Database!");
                })
                .catch((error) => {
                    Alert.alert(error);
                });
            this.setState({ image: result.uri });
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