import React, { useState, useEffect } from "react";
import { TouchableOpacity, Image, View, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import {
  generateUploadedImageStyle,
  uploadImage,
} from "./ProfileUploaderUtils";
import { APP_STRINGS } from "../../constants";

const { successfullyUploaded, uploadImage: uploadImageStr } = APP_STRINGS;

function ProfileUploader(props) {
  const uuid = Math.random();
  // pluckImage is an injected function giving ability to
  // pluck the image from here into a parent component
  const { hasSquareImage, pluckImage } = props;
  const [licenseThumbnail, setlicenseThumbnail] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }

  function persistImage(uri){
    setlicenseThumbnail(uri);
    pluckImage(uri);
  };

  async function setImage() {
    props.triggerLoading()
    try {
      let result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        const { uri } = result;
        const response = await uploadImage(uri, uuid);
        persistImage(response);
        props.pullURI(response)
        props.disableLoading()
        Alert.alert(successfullyUploaded);
      }
    } catch (error) {
      props.disableLoading()
      return Alert.alert(error);
    }
  }

  const source = { uri: licenseThumbnail };
  const style = generateUploadedImageStyle(hasSquareImage);

  return (
    <View style={{width: "100%", justifyContent: "center", alignItems: "center", flexDirection:"column",}}>
      <TouchableOpacity
        style={{
          width: 250,
          height: 50,
          backgroundColor: "#DDE2E4",
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 15,
        }}
        onPress={setImage}
      >
        <Text style={{color: "#161616", fontSize: 20,}}>{uploadImageStr}</Text>
      </TouchableOpacity>
      {!!licenseThumbnail && <Image source={source} style={{width: 200, height: 200}} />}
    </View>
  );
}

export default ProfileUploader;
