import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import loading from '../assets/loading.gif';
import GreenLoading from '../assets/GreenLoading.gif';

const LoadingScreen = () => {
  return (
    <View style={styles.loadingBody}>
      <Image source={GreenLoading} style={styles.loadingImage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#161616",
    height: "100%"
  },
  loadingImage: {
    width: 300,
    height: 300
  }
});

export default LoadingScreen;