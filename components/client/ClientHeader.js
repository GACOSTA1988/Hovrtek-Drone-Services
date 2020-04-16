import React from 'react';
import { Text, View, StyleSheet, Header, Image, Platform, ShadowPropTypesIOS, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const ClientHeader = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.clientHeaderWrapper}>
      <Image
        source={hovrtekLogo}
        style={styles.hovrtekLogo}
      />
      <Ionicons style={styles.hamburger}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
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
    ...Platform.select({
      ios: {
        marginTop: 18,
        backgroundColor: '#092455',
        width: 375,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      android: {
        backgroundColor: '#092455',
        left: -16,
        top: 5,
        alignSelf: 'stretch',
        width: width,
        height: 67,
      }
    })
  },

  hovrtekLogo: {
    ...Platform.select({
      ios: {
        width: 170,
        height: 30,
        position: 'absolute',
        left: 0,
        right: 10,
        top: 7,
      },
      android: {
        width: 170,
        height: 30,
        position: 'absolute',
        left: 10,
        top: 20,
      }
    })
  },

  hamburger: {
    ...Platform.select({
      ios: {
        alignSelf: 'flex-end',
        marginLeft: 300,
        margin: 0
      },
      android: {
        alignSelf: 'flex-end',
        right: 10,
        top: 10
      }
    })
  }

});

const width = Dimensions.get('window').width;

// Android-compatible styling - todo: conditional rendering

//
// const styles = StyleSheet.create({
//   clientHeaderWrapper: {
//     backgroundColor: '#092455',
//     left: -16,
//     top: 5,
//     alignSelf: 'stretch',
//     width: width,
//     height: 67,
//   },
//   hovrtekLogo: {
//     width: 170,
//     height: 30,
//     position: 'absolute',
//     left: 10,
//     top: 20,
//   },
//
//   hamburger: {
// alignSelf:'flex-end',
// right: 10,
// top: 10
//   }
// });

export default ClientHeader;
