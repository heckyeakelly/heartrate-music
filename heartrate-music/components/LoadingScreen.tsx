import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0', // Optional: change the background color
    },
    animation: {
      width: 200, // Adjust the width as needed
      height: 200, // Adjust the height as needed
    },
  });

export function LoadScreen() {
    

    return (
        <View style={styles.container}>
            {/* <ActivityIndicator size="large" color="#0000ff" /> */}
            <LottieView
            source={require('./assets/animation/hourglass.json')} 
            autoPlay
            loop
            style={styles.animation}/>
        </View>
    );
}

export default LoadScreen();