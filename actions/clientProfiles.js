import firebase from "../firebase";

export function getClientProfiles() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/clientProfiles")
      .on("value", (snapshot) => {
        dispatch({
          type: "CLIENT_PROFILES_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postClientProfiles(
  firstName,
  lastName,
  location,
  email,
  bio,
  industry,
  paymentType,
  profileImageUrl,
  userID
) {
  return (dispatch) => {
    firebase.database().ref("/clientProfiles").push({
      firstName,
      lastName,
      location,
      email,
      bio,
      industry,
      paymentType,
      profileImageUrl,
      userID
    });
  };
}

export function editClientProfile(
  firstName,
  lastName,
  location,
  bio,
  industry,
  paymentType,
  profileImageUrl,
  key
) {
  return (dispatch) => {
    firebase
      .database()
      .ref(`/clientProfiles`)
      .child(key)
      .update({
        firstName,
        lastName,
        location,
        bio,
        industry,
        paymentType,
        profileImageUrl,
      });
  };
}
