import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { API_URL } from './config'; // Replace with your backend URL

const SavedCandidatesScreen = () => {
  const [savedCandidates, setSavedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch saved candidates from the backend
  const fetchSavedCandidates = async () => {
    try {
      const response = await fetch(`${API_URL}/getSavedProfiles.php`);
      const result = await response.json();

      // Validate API response
      if (result.status === 'success' && Array.isArray(result.data)) {
        setSavedCandidates(result.data);
      } else {
        console.warn('Invalid API response:', result);
      }
    } catch (error) {
      console.error('Error fetching saved candidates:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchSavedCandidates();
  }, []);

  // Render individual saved candidate
  const renderSavedCandidate = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        {/* Placeholder Avatar */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name?.charAt(0)}</Text>
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.jobTitle}>
            {item.job_title || 'Job title not provided'}
          </Text>
        </View>
      </View>

      {/* Card Body */}
      <View style={styles.body}>
        <Text style={styles.experience}>
          {item.experience || 'Experience not provided'}
        </Text>
        <Text style={styles.skills}>
          {Array.isArray(item.skills) && item.skills.length > 0
            ? item.skills.join(', ')
            : 'No skills provided'}
        </Text>
        <Text style={styles.location}>
          <Text style={styles.boldLabel}>Location:</Text>{' '}
          {item.location || 'Not provided'}
        </Text>
        <Text style={styles.portfolio}>
          {item.portfolio ? (
            <Text
              style={styles.link}
              onPress={() => Linking.openURL(item.portfolio)}
            >
              View Portfolio
            </Text>
          ) : (
            'No portfolio available'
          )}
        </Text>
      </View>
    </View>
  );

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  // Render the main content
  return (
    <View style={styles.container}>
      {savedCandidates.length > 0 ? (
        <FlatList
          data={savedCandidates}
          renderItem={renderSavedCandidate}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noSavedMessage}>No saved candidates yet.</Text>
      )}
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    padding: 20,
    borderWidth: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: '#3498db',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  jobTitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#7f8c8d',
  },
  body: {
    marginTop: 10,
  },
  experience: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  skills: {
    fontSize: 14,
    color: '#27ae60',
    marginBottom: 10,
  },
  location: {
    fontSize: 14,
    color: '#95a5a6',
    marginBottom: 8,
  },
  boldLabel: {
    fontWeight: 'bold',
  },
  portfolio: {
    fontSize: 14,
    color: '#2980b9',
  },
  link: {
    color: '#3498db',
    textDecorationLine: 'underline',
  },
  noSavedMessage: {
    fontSize: 18,
    color: '#95a5a6',
    textAlign: 'center',
    marginTop: 30,
  },
});

export default SavedCandidatesScreen;
