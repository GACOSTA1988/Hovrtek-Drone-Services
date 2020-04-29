import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, Image, TouchableOpacity } from "react-native";
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

  return (
    <View style={styles.container}>
      { profileDetails ? (
        <View>
          <Image source={princePic01} style={styles.backgroundImage}/>
          <View style={styles.editIcon}>
          { (profileDetails.userID === firebase.auth().currentUser.uid) ? (
            <TouchableOpacity>
              <AntDesign
                name="edit"
                size={40}
              />
            </TouchableOpacity>
            ) : (
              <View><Text>aaa</Text></View>
            )}
            </View>
          <Image source={personIcon} style={styles.profileImage}/>
          <Text style={styles.name}>{profileDetails.clientName}</Text>
          <View style={styles.info}>
            <Text style={{fontSize: 20}}>Location: This client is in {profileDetails.clientLocation}</Text>
            <Text style={{fontSize: 20, marginTop: 10}}>Bio: </Text>
            <Text style={{fontSize: 15}}>Amelia Mary Earhart (/ˈɛərhɑːrt/, born July 24, 1897; disappeared July 2, 1937) was an American aviation pioneer and author.[1][Note 1] Earhart was the first female aviator to fly solo across the Atlantic Ocean.[3][Note 2] She set many other records,[2] wrote best-selling books about her flying experiences, and was instrumental in the formation of The Ninety-Nines, an organization for female pilots.[5] </Text>
            <Text style={{fontSize: 20, marginTop: 10}}>Client links:</Text>
          </View>
        </View>
      ) : (
        <Text>User unavailable</Text>
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
    marginLeft: 20
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
  editIcon: {
    marginTop: 160,
    position: 'absolute',
    right: 20,
  }
});

export default ClientEditProfileScreen;
