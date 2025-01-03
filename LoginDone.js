import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LottieView from 'lottie-react-native'; // Install via `npm install lottie-react-native` and link dependencies
import { useNavigation } from '@react-navigation/native';

const LoginDone = () => {
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0); // For fade-in effect

  useEffect(() => {
    // Fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Navigate away after 2 seconds
    const timeout = setTimeout(() => {
      navigation.replace('HomePage'); // Replace with your target screen
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <LottieView
        source={require('../assets/animations/tick.json')} // Ensure the tick animation JSON is in your assets folder
        autoPlay
        loop={false}
        style={styles.animation}
      />
      <Text style={styles.message}>Login Successful</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08A045',
  },
  animation: {
    width: 150,
    height: 150,
  },
  message: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default LoginDone;
