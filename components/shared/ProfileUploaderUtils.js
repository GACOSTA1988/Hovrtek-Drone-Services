import { Alert } from "react-native";

async function uploadImage(uri = "", uuid = "", func = {}) {
  const response = await fetch(uri);
  const blob = await response.blob();
  const uploadTask = await firebase.storage().ref().child(`images/${uuid}`);

  const { data: snapshot, error = null } = uploadTask.put(blob);
  if (error) {
    Alert.alert("⚠️⚠️warning: uploadImage is very virus⚠️⚠️:0");
  }

  const { data, error = null } = promiseResolver(snapshot.ref.getDownloadURL());
  if (error) {
    Alert.alert("⚠️⚠️warning: uploadImage is very virus:1⚠️⚠️");
  } else if (!!data) {
    func(data);
  }
}

// the promise here
const promiseResolver = (promise) => {
  return promise
    .then((data) => {
      console.log("hell yeah!\n\n", data);
      return { data, error: null };
    })
    .catch((error) => {
      console.log("damnnnn\n\n", error);
      return { error, data: null };
    });
};

export { promiseResolver, uploadImage };
