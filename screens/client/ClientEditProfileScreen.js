import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import personIcon from '../../assets/personIcon.png';
import princePic01 from '../../assets/princePic01.jpg';
import * as firebase from 'firebase';
import { connect } from "react-redux";
import _ from "lodash";
import { getClientProfiles } from "../../actions/index";

function ClientEditProfileScreen(props, { getClientProfiles }) {

  const profileDetails = props.route.params;

  const [bio, setBio] = useState("Amelia Mary Earhart (/ˈɛərhɑːrt/, born July 24, 1897; disappeared July 2, 1937) was an American aviation pioneer and author.[1][Note 1] Earhart was the first female aviator to fly solo across the Atlantic Ocean.[3][Note 2] She set many other records,[2] wrote best-selling books about her flying experiences, and was instrumental in the formation of The Ninety-Nines, an organization for female pilots.[5]")
  const [clientName, setClientName] = useState(profileDetails.clientName);
  const [location, setLocation] = useState(profileDetails.clientLocation);

  function save() {
    Alert.alert("todo: save changes to database");
    props.navigation.navigate("ClientProfileScreen");
  }


  return (
    <View style={styles.container}>
      { profileDetails ? (
        <View>
          <Image source={princePic01} style={styles.backgroundImage}/>
          <View style={styles.saveButton}>
          <TouchableOpacity
            onPress={() => save()}>
            <Text style={styles.saveText}>Save Changes</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert("todo: choose image")}
            style={styles.imagePress}
          >
            <Image
              source={personIcon} style={styles.profileImage}
              />
          </TouchableOpacity>
          <TextInput
            style={styles.name}
            placeholder={clientName}
            value={clientName}
            onChangeText={setClientName}
            />
          <View style={styles.info}>
            <View style={{flexDirection: "row"}}>
              <Text style={{fontSize: 20}}>Client is located in </Text>
              <TextInput
              style={{fontSize: 20}}
              placeholder={location}
              value={location}
              onChangeText={setLocation}
            />
            </View>
            <View>
              <Text style={{fontSize: 20, marginTop: 10}}>Bio: </Text>
              <TextInput
                style={styles.input}
                placeholder={bio}
                value={bio}
                onChangeText={setBio}
                multiline={true}
              />
            </View>
            <Text style={{fontSize: 20, marginTop: 10}}>Client links:</Text>
          </View>
        </View>
      ) : (
        <Text>Page unavailable</Text>
      )}
    </View>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center"
  },
  name: {
    fontSize: 30,
    marginLeft: 20,
    width: 300
  },
  profileImage: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginLeft: 20
  },
  info: {
    margin: 20,
  },
  backgroundImage: {
    width: '100%',
    height: 130,
    position: 'absolute'
  },
  saveButton: {
    marginTop: 150,
    position: 'absolute',
    right: 20,
    backgroundColor: "#092455",
    padding: 7,
    borderRadius: 5

  },
  input: {
    fontSize: 15
  },
  imagePress: {
    width: 100
  },
  saveText: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  }
});

export default ClientEditProfileScreen;
