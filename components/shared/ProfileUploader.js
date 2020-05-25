import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import {
  generateUploadedImageStyle,
  promiseResolver,
  uploadImage,
} from "./ProfileUploaderUtils";
import { APP_STRINGS } from "../../constants";

const { successfullyUploaded, uploadImage: uploadImageStr } = APP_STRINGS;
// hasSquareImage = false
// , pluckImage = new Function
function ProfileUploader(props) {
  const uuid = Math.random();
  const { hasSquareImage, pluckImage } = props;

  const [ licenseThumbnail, setlicenseThumbnail ] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  persistImage = (uri = "") => {
    setlicenseThumbnail(uri);
    pluckImage(uri);
  };

  async function setImage() {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const { uri } = result;
      const { error, data } = promiseResolver(uploadImage(uri, uuid));

      if (error) {
        Alert.alert(error);
      } else {
        Alert.alert(successfullyUploaded);
      }

      persistImage(uri);
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
