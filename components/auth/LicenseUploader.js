// Begining Refactored uploader from class to funciton
import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';

function LicenseUploader(props) {

  const [licenseThumbnail, setlicenseThumbnail] = useState(null)

  useEffect(() => {
    getPermissionAsync()
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // await Permissions.askAsync(Permissions.CAMERA);
  }

  async function pushIt() {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, "test-image")
        .then(() => {
          Alert.alert("Successfully Uploaded to the Hovrtek Database!");
        })
        .catch((error) => {
          Alert.alert(error);
        });
      setlicenseThumbnail(result.uri);
    }
  }

  async function uploadImage(uri, imageName) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var uploadTask = await firebase.storage()
    .ref()
    .child("images/" + imageName);

    uploadTask.put(blob).then((snapshot) => {snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log("File available at", downloadURL);
    })});
  }

  return (
    <View >
      <Button title="Upload Image" onPress={pushIt} />
      {licenseThumbnail && <Image source={{ uri: licenseThumbnail }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

export default LicenseUploader;
