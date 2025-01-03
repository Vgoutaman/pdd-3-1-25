import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
  Alert,
} from 'react-native';
import { API_URL } from './config';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SignUpPage = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!userName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/Signuppage.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userName.trim(),
          email: email.trim(),
          password: password.trim(),
          confirmPassword: confirmPassword.trim(),
        }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        Alert.alert('Success', data.message);
        navigation.navigate('Login');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error during sign-up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/loginbackground.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Create Your Account</Text>
        <Text style={styles.subHeader}>Fill in the details to get started</Text>

        <TextInput
          style={styles.input}
          placeholder="User Name"
          value={userName}
          onChangeText={setUserName}
          placeholderTextColor="#666666"
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666666"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666666"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Icon
              name={passwordVisible ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={!passwordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#666666"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#08A045" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomLinkContainer}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.bottomLinkText}>Already have an account? Log in here</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#F3F6FB',
    marginBottom: 10,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginTop: 100,
    marginLeft: 15,
  },
  subHeader: {
    fontSize: 18,
    color: '#F3F6FB',
    marginBottom: 30,
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginTop: 5,
  },
  input: {
    width: '90%',
    height: 50,
    marginBottom: 10,
    paddingHorizontal: 15,
    color: '#F3F6FB',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#F3F6FB',
    marginTop: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#F3F6FB',
    alignSelf: 'center',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#F3F6FB',
  },
  button: {
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomLinkContainer: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    color: '#000',
  },
  bottomLinkText: {
    fontSize: 16,
    color: '#F3F6FB',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SignUpPage;
