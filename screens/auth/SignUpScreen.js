// import React from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import { AuthContext } from "../../context";
// import AuthHeader from '../../components/auth/AuthHeader';
//
// export const SignUp = ({ navigation }) => {
//   const { signInPilot } = React.useContext(AuthContext);
//   const { signInClient } = React.useContext(AuthContext);
//
//
//   return (
//     <View style={styles.container}>
//       <AuthHeader/>
//       <Text>Sign Up Screen</Text>
//       <Button title='Sign Up As Pilot' onPress={() => signInPilot()} />
//       <Button title='Sign Up as Client' onPress={() => signInClient()} />
//     </View>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginVertical: 10,
//     borderRadius: 5
//   }
// });
