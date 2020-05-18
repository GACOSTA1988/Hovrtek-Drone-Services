import { Alert } from "react-native";

const generateUploadedImageStyle = (isSquare = false) => {
  return isSquare
    ? { width: 200, height: 200 }
    : { width: 150, height: 150, border: 5, borderColor: "blue" };
};

async function uploadImage(uri = "", uuid = "", func = {}) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const uploadTask = await firebase.storage().ref().child(`images/${uuid}`);

  const { data: snapshot, error } = promiseResolver(uploadTask.put(blob));
  if (error) {
    Alert.alert("⚠️⚠️warning: uploadImage is very virus⚠️⚠️:1");
  }

  const { data: url, error } = promiseResolver(snapshot.ref.getDownloadURL());
  if (error) {
    Alert.alert("⚠️⚠️warning: uploadImage is very virus:2⚠️⚠️");
  } else if (!!url) {
    func(url);
  }
}

// the promise here is created when you call a function with its params,
// ex. snapshot.ref.getDownloadURL(), uploadTask.put(blob)
// this function processes the promise and returns one of:
// { error, data: null }; let's call it an error object, or
// { data, error: null }; let's say a data object
const promiseResolver = (promise) => {
  return promise
    .catch((error) => {
      console.log("damnnnn\n\n", error);
      return { error, data: null };
    })
    .then((data) => {
      console.log("hell yeah!\n\n", data);
      return { data, error: null };
    });
};

export { generateUploadedImageStyle, promiseResolver, uploadImage };
