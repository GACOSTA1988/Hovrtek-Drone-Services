// Begining Refactored uploader from class to funciton
import React, { useState, useEffect, useContext } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { PassSetProfileImageUrlContext } from "../../screens/client/ClientEditProfileScreen";
import { PassProfileImageUrlState } from "../../screens/client/ClientEditProfileScreen";
import UUIDGenerator from "react-native-uuid-generator";

function ClientProfileUploader(props) {
  const [licenseThumbnail, setlicenseThumbnail] = useState(null);

  const SetProfileImageUrlContext = useContext(PassSetProfileImageUrlContext);

  const profileImageUrlState = useContext(PassProfileImageUrlState);

  // console.log("File available at", downloadURL);
  useEffect(() => {
    getPermissionAsync();
  }, []);

  const uuid = Math.random();

  console.log("UUUIIIDDDD", uuid);
  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    // await Permissions.askAsync(Permissions.CAMERA);
  }

  async function pushIt() {
    // let result = await ImagePicker.launchCameraAsync();
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, uuid)
        .then(() => {
          Alert.alert("Successfully Uploaded to the Hovrtek Database!");
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

    var uploadTask = await firebase
      .storage()
      .ref()
      .child("images/" + uuid);

    uploadTask.put(blob).then((snapshot) => {
      snapshot.ref.getDownloadURL().then(function (downloadURL) {
        SetProfileImageUrlContext(downloadURL);
        // console.log("File available at", imageUrl);
        let test = downloadURL;

        console.log("File available at", test);
      });
    });
  }

  return (
    <View>
      <Button title="Upload Image" onPress={pushIt} />
      {licenseThumbnail && (
        <Image
          source={{ uri: licenseThumbnail }}
          style={{ width: 150, height: 150, border: 5, borderColor: "blue" }}
        />
      )}
    </View>
  );
}

export default ClientProfileUploader;
