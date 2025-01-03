import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  TextInput,
  Switch,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { API_URL } from './config';

const SettingsScreen = ({ navigation }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); 

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API_URL}/getUserData.php`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'success') {
          setUsername(data.user.username);
          setEmail(data.user.email);
          setPassword(data.user.password);
        } else {
          setErrorMessage(data.message || 'Failed to load user data.');
        }
      } else {
        setErrorMessage('Failed to fetch user data. Server returned an error.');
      }
    } catch (error) {
      setErrorMessage('An error occurred while fetching user data.');
      console.error('Fetch Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    navigation.replace('LoginPage');
  };

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error:', response.errorMessage);
        Alert.alert('Error', 'Something went wrong while picking the image.');
      } else if (response.assets && response.assets.length > 0) {
        setProfilePic(response.assets[0].uri);
      }
    });
  };

  const handleSaveChanges = () => {
    Alert.alert('Changes Saved', 'Your changes have been saved.');
  };

  return (
    <ImageBackground
      source={require('../assets/homepagebackground.jpg')}
      style={[styles.container, darkMode ? styles.darkContainer : null]}
      resizeMode="cover"
    >
      {loading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Profile Picture */}
          <View style={[styles.profileContainer, darkMode && styles.darkCard]}>
            <TouchableOpacity onPress={pickImage}>
              {profilePic ? (
                <Image source={{ uri: profilePic }} style={styles.profileImage} />
              ) : (
                <View style={styles.emptyProfileImage}></View>
              )}
            </TouchableOpacity>
            <Text style={[styles.editText, darkMode && styles.darkText]}>
              Tap to change profile picture
            </Text>
          </View>

          {/* Username */}
          <View style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.label, darkMode && styles.darkText]}>Username</Text>
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={newUsername || username}
              onChangeText={setNewUsername}
            />
          </View>

          {/* Email */}
          <View style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.label, darkMode && styles.darkText]}>Email</Text>
            <TextInput
              style={[styles.input, darkMode && styles.darkInput]}
              value={newEmail || email}
              onChangeText={setNewEmail}
            />
          </View>

          {/* Change Password */}
          <View style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.label, darkMode && styles.darkText]}>Change Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput, darkMode && styles.darkInput]}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={24}
                  color={darkMode ? '#FFF' : '#444'}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dark Mode Toggle */}
          <View style={[styles.card, darkMode && styles.darkCard]}>
            <Text style={[styles.label, darkMode && styles.darkText]}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ true: '#2196F3', false: '#767577' }}
            />
          </View>

          {/* Save Changes Button */}
          <TouchableOpacity
            style={[styles.button, styles.saveButton, darkMode && styles.darkButton]}
            onPress={handleSaveChanges}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity
            style={[styles.button, styles.logoutButton, darkMode && styles.darkButton]}
            onPress={handleLogout}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  darkContainer: { backgroundColor: '#333' },
  scrollContent: { padding: 20, alignItems: 'center' },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFF',
    borderRadius: 25,
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    width: '90%',
  },
  darkCard: {
    backgroundColor: '#444',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#2196F3',
  },
  emptyProfileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    marginTop: 15,
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    textAlign: 'center',
  },
  darkText: {
    color: '#FFF',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  label: { fontSize: 18, color: '#333', fontWeight: '600', marginBottom: 8 },
  darkInput: {
    backgroundColor: '#555',
    color: '#FFF',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '90%',
    marginTop: 20,
  },
  saveButton: { backgroundColor: '#4CAF50' },
  logoutButton: { backgroundColor: '#FF6347' },
  buttonText: { fontSize: 18, fontWeight: '600', color: '#FFF' },
  darkButton: {
    backgroundColor: '#333',
  },
  errorText: { fontSize: 16, color: '#FF6347' },
});

export default SettingsScreen;
