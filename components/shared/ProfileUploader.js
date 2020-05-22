import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import {
  generateUploadedImageStyle,
  promiseResolver,
  uploadImage,
} from "./ProfileUploaderUtils";
import { APP_STRINGS } from "../../constants";

const { successfullyUploaded, uploadImage: uploadImageStr } = APP_STRINGS;

function ProfileUploader(hasSquareImage = false) {
  const uuid = Math.random();
  const [ licenseThumbnail, setlicenseThumbnail ] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  async function setImage() {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const { uri } = result;
      const { error, data } = promiseResolver(uploadImage(uri, uuid));

      if (error) {
        Alert.alert(error);
      } else {
        console.log("that good data\n\n", data)
        Alert.alert(successfullyUploaded);
      }

      setlicenseThumbnail(uri);
    }
  }

  const source = { uri: licenseThumbnail };
  const style = generateUploadedImageStyle(hasSquareImage);

  return (
    <View>
      <Button title={uploadImageStr} onPress={setImage} />
      {!!licenseThumbnail && <Image source={source} style={style} />}
    </View>
  );
}

export default ProfileUploader;
