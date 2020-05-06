import firebase from "../firebase";

export function getMessages() {
  return (dispatch) => {
    firebase
      .database()
      .ref("/messages")
      .on("value", (snapshot) => {
        dispatch({
          type: "MESSAGES_FETCH",
          payload: snapshot.val(),
        });
      });
  };
}

export function postMessages(userOneID, userTwoID, body, read, timestamp) {
  return (dispatch) => {
    firebase
      .database()
      .ref("/messages")
      .push({ userOneID, userTwoID, body, read, timestamp });
  };
}

export function readMessage(read, key) {
  return (dispatch) => {
    firebase.database().ref(`/messages`).child(key).update({ read })
  }
}
