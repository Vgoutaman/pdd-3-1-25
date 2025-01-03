import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const WelcomeScreen3 = ({ navigation }) => {
  const scale = useSharedValue(1); // Shared value for animation scaling

  useEffect(() => {
    // Scale animation for the active dot
    scale.value = withTiming(1.5, { duration: 600 });
  }, [scale]);

  // Animated style for the active dot
  const animatedDotStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    width: scale.value === 1.5 ? 24 : 12, // Extended width for active dot
    borderRadius: scale.value === 1.5 ? 12 : 6, // Rounded corners for active
  }));

  return (
    <ImageBackground
      source={require('../assets/welcomescreenbackground.jpg')} // Use the same background image
      style={styles.container}
      resizeMode="cover"
    >
      {/* Skip Button */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Headline */}
        <Text style={styles.headline}>Get Started Today</Text>

        {/* Description */}
        <Text style={styles.description}>
          Begin your journey with TalentMatch and hire smarter, not harder.
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        {/* Page Indicator */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.progressDotInactive]} />
          <View style={[styles.progressDot, styles.progressDotInactive]} />
          <Animated.View
            style={[styles.progressDot, styles.progressDotActive, animatedDotStyle]} // Active dot at 3rd position
          />
        </View>

        {/* Finish Button */}
        <TouchableOpacity
          onPress={() => navigation.replace('Login')}
          style={styles.nextButtonContainer}
        >
          <LinearGradient
            colors={['#FFFFFF', '#FFFFFF']} // No fill color
            style={[styles.nextButton, { borderWidth: 1, borderColor: '#08A045' }]} // Border added
          >
            <Text style={[styles.nextButtonText, { color: '#08A045' }]}>Finish</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  skipButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 10,
  },
  skipButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F3F6FB',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  headline: {
    fontSize: 36, // Increased font size for title
    fontWeight: '700', // Bold but sleek
    color: '#F3F6FB',
    marginBottom: 15,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
    letterSpacing: 1.5,
  },
  description: {
    fontSize: 16, // Moderate size for description
    fontWeight: '300', // Light weight for more readable body text
    color: '#F3F6FB',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 30,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 0.5, // Adds a subtle touch to the text's readability
  },
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 50, // Adjust footer position
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressDot: {
    height: 4,
    borderRadius: 6,
    marginHorizontal: 8,
  },
  progressDotActive: {
    backgroundColor: '#08A045',
  },
  progressDotInactive: {
    backgroundColor: '#B0C4DE',
    width: 12,
  },
  nextButtonContainer: {
    marginTop: 20,
    alignSelf: 'center',
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    borderWidth: 1, // Border added to the button
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#08A045', // Green color for the button text
    textAlign: 'center',
  },
});

export default WelcomeScreen3;
