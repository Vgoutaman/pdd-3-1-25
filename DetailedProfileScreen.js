import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const DetailedProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { candidate } = route.params;

  const handleMessage = () => {
    navigation.navigate('ChatScreen', { candidate });
  };

  const handleSave = () => {
    navigation.navigate('SavedCandidatesScreen', { savedCandidate: candidate });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: candidate.profileImage }} style={styles.profileImage} />
        <View style={styles.info}>
          <Text style={styles.name}>{candidate.name}</Text>
          <Text style={styles.role}>{candidate.role}</Text>
          <Text style={styles.bio}>{candidate.bio}</Text>
        </View>
      </View>

      {/* Location and Portfolio Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Location</Text>
        <Text style={styles.contactItem}>{candidate.location}</Text>

        <Text style={styles.sectionTitle}>Portfolio</Text>
        <TouchableOpacity
          style={styles.portfolioButton}
          onPress={() => navigation.navigate('PortfolioScreen', { portfolio: candidate.portfolio })}
        >
          <Text style={styles.contactItem}>{candidate.portfolio}</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.button, styles.messageButton]}
          onPress={handleMessage}
        >
          <MaterialIcons name="message" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <MaterialIcons name="favorite" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    width: '100%',  // Ensure full width is used
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  info: {
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '80%', // Prevents text overflow by setting a max width
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    flexWrap: 'wrap',
  },
  bio: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
    flexWrap: 'wrap',
    overflow: 'hidden',
    paddingRight: 10,
    width: '100%', // Ensures the bio takes the full width of the container
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  portfolioButton: {
    marginTop: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '45%',
    justifyContent: 'center',
  },
  messageButton: {
    backgroundColor: '#f39c12',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFF',
    marginLeft: 10,
    fontSize: 14,
  },
});

export default DetailedProfileScreen;
