import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { API_URL } from './config';

const CandidateProfileScreen = ({ route }) => {
  const { candidateId, readOnly = false } = route.params || {};
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    job_title: '',
    portfolio: '',
    skills: '',
    experience: '',
    job_history: '',
    social_media: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch candidate data from backend
  const fetchProfileData = async () => {
    try {
      const response = await fetch(`${API_URL}/getCandidateProfile.php?candidateId=${candidateId}`);
      const data = await response.json();
      if (response.ok) {
        setFormData({
          name: data.Name || '',
          location: data.Location || '',
          job_title: data['Job Title'] || '',
          portfolio: data.Portfolio || '',
          skills: data.Skills || '',
          experience: data.Experience || '',
          job_history: data['Job History'] || '',
          social_media: data['Social Media'] || '',
        });
      } else {
        Alert.alert('Error', data.message || 'Failed to fetch profile data');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while fetching profile data');
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [candidateId]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_URL}/storeCandidateProfile.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, candidateId }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile saved successfully!');
        setIsEditing(false); // Switch back to view mode
        fetchProfileData(); // Refresh data
      } else {
        Alert.alert('Error', data.message || 'Failed to save profile');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while saving the profile');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Text style={styles.label}>Name</Text>
<TextInput
  style={[styles.input, { backgroundColor: '#e0e0e0' }]} // Greyed-out background for non-editable
  placeholder="Name"
  value={formData.name}
  editable={false} // Make it non-editable
/>


      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={formData.location}
        onChangeText={(value) => handleInputChange('location', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Job Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter job title"
        value={formData.job_title}
        onChangeText={(value) => handleInputChange('job_title', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Portfolio</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter portfolio URL"
        value={formData.portfolio}
        onChangeText={(value) => handleInputChange('portfolio', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Skills</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter skills (comma-separated)"
        value={formData.skills}
        onChangeText={(value) => handleInputChange('skills', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Experience</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter years of experience"
        value={formData.experience}
        onChangeText={(value) => handleInputChange('experience', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Job History</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe job history"
        value={formData.job_history}
        onChangeText={(value) => handleInputChange('job_history', value)}
        editable={isEditing && !readOnly}
      />

      <Text style={styles.label}>Social Media</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter social media links"
        value={formData.social_media}
        onChangeText={(value) => handleInputChange('social_media', value)}
        editable={isEditing && !readOnly}
      />

      {!readOnly && (
        <TouchableOpacity
          style={styles.button}
          onPress={isEditing ? handleSubmit : () => setIsEditing(true)}
        >
          <Text style={styles.buttonText}>{isEditing ? 'Save Profile' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff', // Clean white background
    flexGrow: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#1e1e2f', // Corporate dark gray
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#2d2d44', // Medium gray for labels
  },
  input: {
    height: 50,
    borderColor: '#d1d5db', // Soft border color
    borderWidth: 1,
    borderRadius: 10, // Rounded corners for modern feel
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb', // Slightly off-white background for inputs
    color: '#2d2d44',
    shadowColor: '#000', // Subtle shadow
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Shadow for Android
  },
  button: {
    backgroundColor: '#0073e6', // Corporate blue for action button
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0073e6',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // Enhanced shadow for button
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});


export default CandidateProfileScreen;
