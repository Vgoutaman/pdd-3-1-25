import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const TestimonialScreen = () => {
  const testimonials = [
    {
      id: 1,
      text: "Great app for posting jobs and finding candidates!",
      name: "John Doe",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      text: "Helped me find the perfect candidate for my business.",
      name: "Jane Smith",
      image: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      text: "The best platform for connecting with potential hires.",
      name: "Alex Johnson",
      image: "https://via.placeholder.com/50",
    },
  ];

  return (
    <LinearGradient
      colors={['#FFFFFF', '#08A045']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Title */}
        <Text style={styles.title}>What People Are Saying</Text>

        {/* Testimonials */}
        {testimonials.map((testimonial) => (
          <View key={testimonial.id} style={styles.testimonialCard}>
            <Image source={{ uri: testimonial.image }} style={styles.profileImage} />
            <View style={styles.textContainer}>
              <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
              <Text style={styles.authorText}>— {testimonial.name}</Text>
            </View>
          </View>
        ))}

        {/* Call to Action */}
        <TouchableOpacity style={styles.shareButton}>
          <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            style={styles.shareButtonGradient}
          >
            <Text style={styles.shareButtonText}>Share Your Feedback</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  testimonialCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  textContainer: {
    flex: 1,
  },
  testimonialText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  shareButton: {
    marginTop: 20,
    borderRadius: 8,
  },
  shareButtonGradient: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TestimonialScreen;
