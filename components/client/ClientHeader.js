import React from 'react';
import { Text, View, StyleSheet, Header, Image, ShadowPropTypesIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';

import {useNavigation, DrawerActions} from '@react-navigation/native';

const ClientHeader = () => {

const navigation = useNavigation();
console.log(navigation);

  return (

  <View style={styles.clientHeaderWrapper}>

      <Image

        source={hovrtekLogo}
        style={styles.hovrtekLogo}
        />
        <Ionicons style={styles.hamburger}
        onPress={() => {
        navigation.dispatch(DrawerActions.openDrawer());
        }}
        name="ios-menu"
        size={45}
        color="white"
        resizeMode="contain"
        />  

    </View>
  )
}

const styles = StyleSheet.create({
    clientHeaderWrapper: {
        marginTop: 18,
        backgroundColor: '#092455',
        width: 375,
        height:50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hovrtekLogo: {
        width: 170,
        height: 30,
        position: 'absolute',
        left: 0,
        right: 10,
        top: 7,
        },

        hamburger: {
        alignSelf:'flex-end',
        marginLeft: 300,
        margin: 0
        }
});

export default ClientHeader;

