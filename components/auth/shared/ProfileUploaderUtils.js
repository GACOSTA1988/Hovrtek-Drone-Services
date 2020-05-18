async function uploadImage(uri = "", uuid = "") {
  const response = await fetch(uri);
  const blob = await response.blob();

  const uploadTask = await firebase.storage().ref().child(`images/${uuid}`);

  uploadTask.put(blob).then((snapshot) => {
    snapshot.ref.getDownloadURL().then((downloadURL) => {
      SetProfileImageUrlContext(downloadURL);
    });
  });
}

const promiseResolver = (promise) => {
  return promise
    .then((data) => {
      return { data, error: null };
    })
    .catch((error) => {
      return { error, data: null };
    });
};

export { promiseResolver, uploadImage };
