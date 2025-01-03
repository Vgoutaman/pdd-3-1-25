import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const mockCandidates = [
  {
    id: '1',
    name: 'John Doe',
    profileImage: 'https://via.placeholder.com/100',
  },
  {
    id: '2',
    name: 'Jane Smith',
    profileImage: 'https://via.placeholder.com/100',
  },
  // Add more candidates if needed
];

const MessageListScreen = () => {
  const navigation = useNavigation();

  const handleChatClick = (candidate) => {
    navigation.navigate('ChatBoxScreen', { candidate });
  };

  const renderContact = ({ item }) => (
    <TouchableOpacity style={styles.contact} onPress={() => handleChatClick(item)}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Messages</Text>
      <FlatList
        data={mockCandidates}
        renderItem={renderContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
});

export default MessageListScreen;
