import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import loading from '../assets/loading.gif';

const LoadingScreen = () => {
  return (
    <View style={styles.loadingBody}>
      <Image source={loading} style={styles.loadingImage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingBody: {
    alignItems: "center",
    justifyContent: "center",
    flex: .8
  },
  loadingImage: {
    width: 300,
    height: 300
  }
});

export default LoadingScreen;
