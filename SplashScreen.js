import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('WelcomeScreen1'); // Navigate to the first welcome screen
    }, 3000); // 3-second delay for the splash screen

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#08A045']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Logo or Icon */}
      <Image
        source={require('../assets/logo.png')} // Update with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* App Name */}
      <Text style={styles.appName}>TalentApp</Text>

      {/* Tagline */}
      <Text style={styles.tagline}>Find Talent Instantly</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
  },
});

export default SplashScreen;
