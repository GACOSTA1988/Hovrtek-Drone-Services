import React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';

function CustomHeader(props) {
  return (
    <View style={{flexDirection: 'row', height: 50}}>
      <View>
          {
          props.isHome ?
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Ionicons
              style={styles.hamburger}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
              name="ios-menu"
              size={45}
              color="white"
              resizeMode="contain"
            />
          </TouchableOpacity>
          :
          <TouchableOpacity 
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => props.navigation.goBack()}
          >
              {/* <Image style={{width: 25, height: 25, marginLeft: 5}}
              source={IMAGE.ICON_BACK}
              resizeMode="contain"
              /> */}
              <Text>Back</Text>
          </TouchableOpacity>
          }
      </View>  
          
      <View>
        <Text>{props.title}</Text>
      </View>
    </View>
  );
}