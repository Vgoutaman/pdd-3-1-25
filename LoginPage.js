import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { API_URL } from './config';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon library

const LoginPage = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/Login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        navigation.navigate('HomePage', { user: data.user });
      } else {
        Alert.alert('Login Failed', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while trying to log in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/loginbackground.jpg')} // Update the path to your image
      style={styles.container}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Enable the future of your workflow.</Text>
        <Text style={styles.subHeader}>Effortlessly manage and streamline your processes.</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="default"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#666666"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="#666666"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#666666"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#08A045" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomLinkContainer}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.bottomLinkText}>Don't have an account? Register Here</Text>
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
    marginBottom: 10, // Reduced space between username and password
    paddingHorizontal: 15,
    color: '#F3F6FB',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#F3F6FB',
    marginTop: 60,
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

export default LoginPage;
