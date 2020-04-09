import React from 'react';
import { Text, View, StyleSheet, Header, Image, ShadowPropTypesIOS } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import hovrtekLogo from '../../assets/hovrtek_logo.png';
import { useNavigation, DrawerActions } from '@react-navigation/native';


const TestHeader = () => {

const navigation = useNavigation();
console.log(navigation);

 const openBurger = () => {
 navigation.toggleDrawer()
}


  return (

  <View style={styles.testHeaderWrapper}>
<Text style={styles.fuck} onPress={() => alert('fart')}>FAERT</Text>
      <Image
      onPress={openBurger}
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
    testHeaderWrapper: {
    
        backgroundColor: '#092455',
        width: '100%',
        height:'100%',
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
        top: 0,
        },

        hamburger: {
        alignSelf:'flex-end',
        marginLeft: 300,
        margin: 0
        }
});


export default TestHeader;



{/* <Image
source={hovrtekLogo}
style={styles.hovrtekLogo}
/>
<Ionicons style={styles.hamburger}

  name="ios-menu"
  size={45}
  color="white"
  resizeMode="contain"
  />   */}


//   CSS for importing as a component, as opposed to being created in the stack
//   testHeaderWrapper: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     top: 25,
//     backgroundColor: '#092455'
//     },
// hamburger: {
//     alignSelf:'flex-end',
//     margin: 5
//   },
//   hovrtekLogo: {
//     width: 170,
//     height: 30,
//     position: 'absolute',
//     left: 5,
//     right: 0,
//     top: 13,
//   }
// })