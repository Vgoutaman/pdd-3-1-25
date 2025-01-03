import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const AboutUsScreen = () => {
  const slides = [
    'https://via.placeholder.com/400x150', // Replace with your image URLs
    'https://via.placeholder.com/400x150',
    'https://via.placeholder.com/400x150',
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Swiper for slides */}
      <Swiper
        style={styles.swiper}
        autoplay
        autoplayTimeout={3}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {slides.map((slide, index) => (
          <Image key={index} source={{ uri: slide }} style={styles.slideImage} />
        ))}
      </Swiper>

      {/* Original Content */}
      <Image
        source={{ uri: 'https://via.placeholder.com/150x100' }} // Replace with your logo or banner URL
        style={styles.bannerImage}
      />
      <Text style={styles.title}>About Us</Text>
      <Text style={styles.text}>
        At <Text style={styles.brandName}>TalentConnect</Text>, we are committed to transforming the way businesses discover talent and how professionals showcase their skills. We aim to bridge the gap between employers and job seekers by simplifying the hiring process.
      </Text>
      <Text style={styles.text}>
        Our platform empowers businesses to quickly find the right candidates and enables job seekers to highlight their unique strengths through personalized profiles and portfolios. With cutting-edge technology and user-focused design, we ensure a seamless and efficient recruitment experience.
      </Text>
      <Text style={styles.text}>
        Whether you are a small business owner looking for talent or a professional striving to make an impact, <Text style={styles.brandName}>TalentConnect</Text> is here to help you succeed.
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          To create a platform where talent and opportunities connect effortlessly, fostering growth for businesses and individuals alike.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Vision</Text>
        <Text style={styles.sectionText}>
          To become the most trusted and innovative platform for recruitment, enabling meaningful connections that drive success.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Values</Text>
        <Text style={styles.sectionText}>
          - Integrity: We prioritize honesty and transparency in every interaction.
        </Text>
        <Text style={styles.sectionText}>
          - Innovation: We constantly innovate to provide cutting-edge solutions.
        </Text>
        <Text style={styles.sectionText}>
          - Empowerment: We empower businesses and individuals to achieve their goals.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  swiper: {
    height: 150,
    marginBottom: 20,
  },
  slideImage: {
    width: Dimensions.get('window').width - 32, // Full width minus padding
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: '#ccc',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: '#4CAF50',
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
  },
  brandName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  section: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});

export default AboutUsScreen;