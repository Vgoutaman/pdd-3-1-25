import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing the home icon

const ChatBoxScreen = () => {
  const navigation = useNavigation();

  // State to hold chat data
  const [chats, setChats] = useState([]);

  // Fetch chat data from the server
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch('http://10.0.2.2/talentapp/get_chats.php'); // Update the URL if necessary
        const data = await response.json();
        console.log('Fetched Chats:', data); // Log the fetched data to debug
        if (data.chats) {
          setChats(data.chats);
        } else {
          console.error('No chats found or failed to fetch');
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
  
    fetchChats();
  }, []);
  

  // Handle chat press
  const handleChatPress = (chat) => {
    // Navigate to ChatScreen with chat details
    navigation.navigate('ChatScreen', { chat });
  };

  // Render each chat item
  const renderChatItem = ({ item }) => (
    <TouchableOpacity style={styles.chatItem} onPress={() => handleChatPress(item)}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={styles.homeButton}>
          <Icon name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      {/* Chat List */}
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatList}
      />

      {/* Search Input (Optional) */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search chats..." />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    backgroundColor: '#075E54',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  homeButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1, // Ensures the title takes up remaining space
    textAlign: 'center',
  },
  chatList: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  chatItem: {
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
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  searchInput: {
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default ChatBoxScreen;
