import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HamburgerMenu = ({ navigation }) => {
  const [dropdownVisible, setDropdownVisible] = useState({
    clientele: false,
    partOfUs: false,
    contactUs: false,
    partnerWithUs: false,
  });

  const toggleDropdown = (section) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleNavigate = (screen) => {
    navigation.navigate(screen);
  };

  // Example data to display in dropdown
  const clienteleData = [
    'Client 1 - Tech Corp',
    'Client 2 - Innovators LLC',
    'Client 3 - Creative Studios',
  ];

  const partOfUsData = [
    'Founder - Goutam',
    'Send Email - talentapp@gmail.com',
    
  ];

  const contactUsData = [
    'Email: contact@talentapp.com',
    'Phone: +1 (123) 456-7890',
    'Address: 123 Talent St, City, Country',
  ];

  const partnerWithUsData = [
    'Partner 1 - Business Solutions',
    'Partner 2 - Marketing Agency',
    'Partner 3 - Development Team',
  ];

  return (
    <View style={styles.overlay}>
      <View style={styles.menuContainer}>
        {/* Header */}
        <Text style={styles.headerText}>Menu</Text>

        {/* Menu Items */}
        <View style={styles.menuItems}>
          {/* Clientele Dropdown */}
          <TouchableOpacity onPress={() => toggleDropdown('clientele')} style={styles.menuItem}>
            <Icon name="business" size={20} color="#051367" />
            <Text style={styles.menuText}>Clientele</Text>
          </TouchableOpacity>
          {dropdownVisible.clientele && (
            <View style={styles.dropdownContent}>
              {clienteleData.map((item, index) => (
                <Text key={index} style={styles.dropdownText}>{item}</Text>
              ))}
            </View>
          )}

          {/* Testimonials Button */}
          <TouchableOpacity onPress={() => handleNavigate('TestimonialScreen')} style={styles.menuItem}>
            <Icon name="star" size={20} color="#051367" />
            <Text style={styles.menuText}>Testimonials</Text>
          </TouchableOpacity>

          {/* Part of Us Dropdown */}
          <TouchableOpacity onPress={() => toggleDropdown('partOfUs')} style={styles.menuItem}>
            <Icon name="group" size={20} color="#051367" />
            <Text style={styles.menuText}>Part of Us</Text>
          </TouchableOpacity>
          {dropdownVisible.partOfUs && (
            <View style={styles.dropdownContent}>
              {partOfUsData.map((item, index) => (
                <Text key={index} style={styles.dropdownText}>{item}</Text>
              ))}
            </View>
          )}

          {/* Contact Us Dropdown */}
          <TouchableOpacity onPress={() => toggleDropdown('contactUs')} style={styles.menuItem}>
            <Icon name="mail" size={20} color="#051367" />
            <Text style={styles.menuText}>Contact Us</Text>
          </TouchableOpacity>
          {dropdownVisible.contactUs && (
            <View style={styles.dropdownContent}>
              {contactUsData.map((item, index) => (
                <Text key={index} style={styles.dropdownText}>{item}</Text>
              ))}
            </View>
          )}

          {/* Partner With Us Dropdown */}
          <TouchableOpacity onPress={() => toggleDropdown('partnerWithUs')} style={styles.menuItem}>
            <Icon name="handshake" size={20} color="#051367" />
            <Text style={styles.menuText}>Partner With Us</Text>
          </TouchableOpacity>
          {dropdownVisible.partnerWithUs && (
            <View style={styles.dropdownContent}>
              {partnerWithUsData.map((item, index) => (
                <Text key={index} style={styles.dropdownText}>{item}</Text>
              ))}
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2024 Talent App</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'flex-start', // Align menu to the left
  },
  menuContainer: {
    width: '100%', // Full-width menu
    height: '100%', // Full height of the screen
    backgroundColor: '#F7F7F7', // Lighter white background
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    elevation: 100, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuItems: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1, // Allows the menu to expand to fill the screen
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  menuText: {
    fontSize: 16,
    color: '#051367',
    marginLeft: 10,
  },
  dropdownContent: {
    paddingLeft: 40, // Indentation for dropdown content
    paddingTop: 10,
    paddingBottom: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#051367',
    marginBottom: 5,
  },
  footer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
  },
});

export default HamburgerMenu;
