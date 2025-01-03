import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImageBackground, TouchableOpacity } from 'react-native'; // Import ImageBackground and TouchableOpacity
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

// Import your Screens
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen1 from './screens/WelcomeScreen1';
import WelcomeScreen2 from './screens/WelcomeScreen2';
import WelcomeScreen3 from './screens/WelcomeScreen3';
import LoginPage from './screens/LoginPage';
import LoginDone from './screens/LoginDone';
import SignUpPage from './screens/SignUpPage';
import HomePage from './screens/HomePage';
import HamburgerMenu from './screens/HamburgerMenu';
import PostJobDetailsScreen from './screens/PostJobDetailsScreen';
import GeneratedCandidatesScreen from './screens/GeneratedCandidatesScreen';
import SavedCandidatesScreen from './screens/SavedCandidatesScreen';
import CandidateProfileScreen from './screens/CandidateProfileScreen';
import DetailedProfileScreen from './screens/DetailedProfileScreen';
import CandidateDetailsScreen from './screens/CandidateDetailsScreen'; // New Screen Import
import ChatScreen from './screens/ChatScreen';
import ChatBoxScreen from './screens/ChatBoxScreen';
import SettingsScreen from './screens/SettingsScreen';
import TestimonialScreen from './screens/TestimonialScreen';
import JobHistory from './screens/JobHistory';
import AboutUsScreen from './screens/AboutUsScreen';
import NotFoundScreen from './screens/NotFoundScreen';

// Create Tab Navigator
const Tab = createBottomTabNavigator();

function BottomTabs() {
  const navigation = useNavigation(); // Get the navigation prop using the hook

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          height: 60, 
          paddingBottom: 10, 
          backgroundColor: 'transparent',
        },
        tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
        tabBarActiveTintColor: '#000000',
        headerShown: false,
        tabBarBackground: () => (
          <ImageBackground
            source={require('./assets/homepagebackground2.png')}
            style={{ flex: 1 }} 
            resizeMode="cover"
          />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={JobHistory}
        options={{
          tabBarIcon: ({ color }) => <Icon name="history" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color }) => <Icon name="settings" size={24} color={color} />,
        }}
      />
      {/* Custom Button for Post Job */}
      <Tab.Screen
        name="Post Job"
        component={HomePage} // This can be any dummy component since it's overridden by the button
        options={{
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: [{ translateX: -24 }], // Adjust position
                backgroundColor: '#00fdff', // Button color
                borderRadius: 50,
                padding: 10,
              }}
              onPress={() => navigation.navigate('PostJobDetailsScreen')} // Navigate to PostJobDetailsScreen
            >
              <Icon name="add" size={25} color="#fff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        
        {/* Welcome Screens */}
        <Stack.Screen
          name="WelcomeScreen1"
          component={WelcomeScreen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen2"
          component={WelcomeScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WelcomeScreen3"
          component={WelcomeScreen3}
          options={{ headerShown: false }}
        />

        {/* Authentication Screens */}
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginDone"
          component={LoginDone}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpPage}
          options={{ headerShown: false }}
        />

        {/* Main App Screens */}
        <Stack.Screen
          name="HomePage"
          component={BottomTabs}  // Use BottomTabs as the main navigator
          options={{ headerShown: false }}  // Hide the header for this screen
        />
        

        {/* Other Screens */}
        <Stack.Screen
          name="PostJobDetailsScreen"
          component={PostJobDetailsScreen}
          options={{
            title: 'Post a Job',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="GeneratedCandidatesScreen"
          component={GeneratedCandidatesScreen}
          options={{
            title: 'Qualified Candidates',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="CandidateProfileScreen"
          component={CandidateProfileScreen}
          options={{
            title: 'Candidate Profile',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="DetailedProfileScreen"
          component={DetailedProfileScreen}
          options={{
            title: 'Detailed Profile',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="HamburgerMenu"
          component={HamburgerMenu}
          options={{
            title: 'Menu',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="CandidateDetailsScreen" // New Screen
          component={CandidateDetailsScreen}
          options={{
            title: 'Candidate Details',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="SavedCandidatesScreen"
          component={SavedCandidatesScreen}
          options={{
            title: 'Saved Candidates',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            title: 'Chats',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChatBoxScreen"
          component={ChatBoxScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="TestimonialScreen"
          component={TestimonialScreen}
          options={{
            title: 'Testimonials',
            headerTitleAlign: 'center',
          }}
        />

        <Stack.Screen
          name="JobHistory"
          component={JobHistory}
          options={{ title: 'Posted Job History' }} 
        />

        <Stack.Screen
          name="AboutUsScreen"
          component={AboutUsScreen}
          options={{
            title: 'About Us',
            headerTitleAlign: 'center',
          }}
        />

        {/* Not Found Screen */}
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
