import { Alert } from "react-native";

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
// ex.
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

export { promiseResolver, uploadImage };
