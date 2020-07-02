import * as firebase from "firebase";

const signOut = (props) => {
  try {
    firebase.auth().signOut();
    props.navigation.navigate("SignIn");
  } catch (error) {}
  return null;
};

export default signOut;
