import { Alert } from "react-native";
import * as firebase from "firebase";

const generateUploadedImageStyle = (isSquare = false) => {
  return isSquare
    ? { width: 200, height: 200 }
    : { width: 150, height: 150, borderWidth: 5, borderColor: "blue" };
};

async function uploadImage(uri = "", uuid = "") {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const uploadTask = await firebase.storage().ref().child(`images/${uuid}`);

    const snapshot = await uploadTask.put(blob);
    const url = await snapshot.ref.getDownloadURL();
    return url;
  } catch (error) {
    Alert.alert("uploadImage failure ", error);
  }
}

export { generateUploadedImageStyle, uploadImage };
