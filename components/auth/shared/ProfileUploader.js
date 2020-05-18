import React, { useState, useEffect } from "react";
import { Button, Image, View, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { promiseResolver, uploadImage } from "ProfileUploaderUtils";

// todo move to app_strings
const SUCCESS_UPLOAD = "Successfully Uploaded to the Hovrtek Database!";
const UPLOAD_IMAGE = "Upload Image";

function ProfileUploader(isPilot = false) {
  const uuid = Math.random();
  const [ licenseThumbnail, setlicenseThumbnail ] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  async function pushIt() {
    let result = await ImagePicker.launchImageLibraryAsync();

    if (!result.cancelled) {
      const { uri } = result;
      const { error } = promiseResolver(uploadImage(uri, uuid));

      if (error) {
        Alert.alert(error);
      } else {
        Alert.alert(SUCCESS_UPLOAD);
      }

      setlicenseThumbnail(uri);
    }
  }

  const source = { uri: licenseThumbnail };

  // todo make into util
  const style = isPilot
    ? { width: 200, height: 200 }
    : { width: 150, height: 150, border: 5, borderColor: "blue" };

  return (
    <View>
      <Button title={UPLOAD_IMAGE} onPress={pushIt} />
      {!!licenseThumbnail && <Image source={source} style={style} />}
    </View>
  );
}

export default ProfileUploader;
