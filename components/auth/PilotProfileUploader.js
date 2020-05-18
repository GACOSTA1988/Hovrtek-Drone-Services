// Begining Refactored uploader from class to funciton
import React, { useState, useEffect, useContext } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { PassSetProfileImageUrlContext } from "../../screens/pilot/PilotProfileImageUploadScreen";
import { PassProfileImageUrlState } from "../../screens/pilot/PilotProfileImageUploadScreen";
import UUIDGenerator from "react-native-uuid-generator";

// todo move to app_strings
const SUCCESS_UPLOAD = "Successfully Uploaded to the Hovrtek Database!";

function PilotProfileUploader() {
  const uuid = Math.random();
  const [ licenseThumbnail, setlicenseThumbnail ] = useState(null);

  const SetProfileImageUrlContext = useContext(PassSetProfileImageUrlContext);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  async function pushIt() {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, uuid)
        .then(() => {
          Alert.alert(SUCCESS_UPLOAD);
        })
        .catch((error) => {
          Alert.alert(error);
        });
      setlicenseThumbnail(result.uri);
    }
  }

  async function uploadImage(uri, uuid) {
    const response = await fetch(uri);
    const blob = await response.blob();

    var uploadTask = await firebase.storage().ref().child("images/" + uuid);

    uploadTask.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
        SetProfileImageUrlContext(downloadURL);
      });
    });
  }

  return (
    <View>
      <Button title="Upload Image" onPress={pushIt} />
      {licenseThumbnail && (
        <Image
          source={{ uri: licenseThumbnail }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </View>
  );
}

export default PilotProfileUploader;
