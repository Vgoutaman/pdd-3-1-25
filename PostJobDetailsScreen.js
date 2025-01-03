import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker'; // Import Picker for location selection
import { API_URL } from './config'; // Make sure API_URL is updated correctly

const PostJobDetailsScreen = () => {
  const [jobDetails, setJobDetails] = useState({
    'Company Name': '',
    Location: '',
    'Job Title': '',
    'Required Skills': '',
    'Experience Level': '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigation = useNavigation(); // Initialize navigation

  const indianCities = [
    'New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bangalore', 'Hyderabad', 'Pune',
    'Ahmedabad', 'Jaipur', 'Lucknow', 'Surat', 'Patna', 'Indore', 'Vadodara',
    'Chandigarh', 'Bhopal', 'Coimbatore', 'Kanpur', 'Nagpur', 'Visakhapatnam',
    'Madurai', 'Vijayawada', 'Ludhiana', 'Agra', 'Jammu', 'Noida', 'Faridabad',
    'Gurgaon', 'Rajkot', 'Mysore', 'Howrah', 'Meerut', 'Ranchi', 'Nashik', 'Dhanbad',
  ];

  const handleInputChange = (field, value) => {
    setJobDetails((prevDetails) => ({ ...prevDetails, [field]: value }));
  };

  const handlePostJob = async () => {
    const { 'Company Name': companyName, Location: location, 'Job Title': jobTitle, 'Required Skills': requiredSkills, 'Experience Level': experienceLevel } = jobDetails;

    if (!companyName || !location || !jobTitle || !requiredSkills || !experienceLevel) {
      setErrorMessage('Please fill out all fields');
      return;
    }

    try {
      // Post the job details to the backend (postJob.php)
      const response = await fetch(`${API_URL}/postJob.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'Company Name': companyName,
          Location: location,
          'Job Title': jobTitle,
          'Required Skills': requiredSkills,
          'Experience Level': experienceLevel,
        }),
      });

      const result = await response.json();

      if (result.status === 'success') {
        setErrorMessage('');

        // Now, search for matching candidates in the candidateprofile table (searchCandidates.php)
        const searchResponse = await fetch(`${API_URL}/searchCandidates.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            Location: location,
            'Experience Level': experienceLevel,
            'Required Skills': requiredSkills,
            'Job Title': jobTitle,
          }),
        });

        const searchResult = await searchResponse.json();

        if (searchResult.status === 'success' && searchResult.candidates && searchResult.candidates.length > 0) {
          navigation.navigate('GeneratedCandidatesScreen', { candidates: searchResult.candidates });
        } else {
          setErrorMessage('No matching candidates found.');
        }
      } else {
        setErrorMessage(result.message || 'Failed to post job');
      }
    } catch (error) {
      setErrorMessage('An error occurred while processing your request');
      console.error('Error:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/homepagebackground.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.subHeader}>Provide information about the job to post:</Text>

            <View style={styles.formContainer}>
              {[
                { label: 'Company Name', field: 'Company Name', icon: 'business' },
                { label: 'Job Title', field: 'Job Title', icon: 'title' },
                { label: 'Required Skills', field: 'Required Skills', icon: 'build' },
                { label: 'Experience Level', field: 'Experience Level', icon: 'accessibility' },
              ].map(({ label, field, icon }, index) => (
                <View key={index} style={styles.inputWrapper}>
                  <Text style={styles.label}>
                    <MaterialIcons name={icon} size={20} color="#4CAF50" /> {label}
                  </Text>
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter ${label.toLowerCase()}`}
                    value={jobDetails[field]}
                    onChangeText={(text) => handleInputChange(field, text)}
                    placeholderTextColor="#aaa"
                  />
                </View>
              ))}

              {/* Add location picker */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>
                  <MaterialIcons name="location-on" size={20} color="#4CAF50" /> Location
                </Text>
                <Picker
                  selectedValue={jobDetails.Location}
                  onValueChange={(value) => handleInputChange('Location', value)}
                  style={styles.input}
                >
                  <Picker.Item label="Select Location" value="" />
                  {indianCities.map((city, index) => (
                    <Picker.Item key={index} label={city} value={city} />
                  ))}
                </Picker>
              </View>
            </View>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            {/* Transparent Post Job Button */}
            <TouchableOpacity style={styles.button} onPress={handlePostJob}>
              <Text style={styles.buttonText}>Post Job</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, paddingBottom: 10 },
  subHeader: { fontSize: 16, color: '#FFFFFF', marginBottom: 24, textAlign: 'center' },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    marginBottom: 12,
  },
  inputWrapper: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 8 },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  button: {
    marginTop: 10,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
  errorMessage: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PostJobDetailsScreen;