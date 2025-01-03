import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ route, navigation }) => {
  const { candidate } = route?.params || {};
  const candidateName = candidate?.Name || 'Candidate';
  const profilePicture = candidate?.profilePicture || 'https://via.placeholder.com/40';
  const senderUsername = 'User'; // Current user's username

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Reference for FlatList
  const flatListRef = useRef();

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://10.0.2.2/talentapp/get_messages.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sender_username: senderUsername,
            receiver_username: candidateName,
          }),
        });
        const data = await response.json();
        if (data.messages) {
          setMessages(data.messages);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  // Scroll to the bottom when a new message is sent
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Send a new message
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    try {
      await fetch('http://10.0.2.2/talentapp/store_message.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: newMessage,
          sender_username: senderUsername, // Replace with actual sender username dynamically
          receiver_username: candidateName,
        }),
      });

      const messageTimestamp = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      const messageDate =
        new Date().toDateString() === new Date().toDateString() ? 'Today' : 'Yesterday';

      setMessages([
        ...messages,
        {
          sender: 'You', // Display as 'You' for user's messages
          text: newMessage,
          timestamp: messageTimestamp,
          date: messageDate,
        },
      ]);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const renderMessage = ({ item, index }) => {
    const isUser = item.sender === 'You';
    const showDateHeader = index === 0 || messages[index - 1]?.date !== item.date;

    return (
      <>
        {showDateHeader && (
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        )}
        <View style={[styles.messageRow, isUser ? styles.userRow : styles.candidateRow]}>
          {!isUser && (
            <Image source={{ uri: profilePicture }} style={styles.chatProfilePicture} />
          )}
          <View>
            {!isUser && <Text style={styles.senderName}>{item.sender}</Text>}
            <View
              style={[
                styles.messageContainer,
                isUser ? styles.userMessage : styles.candidateMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={{ uri: profilePicture }} style={styles.profilePicture} />
        <Text style={styles.contactName}>{candidateName}</Text>
        <MaterialIcons name="more-vert" size={24} color="#fff" style={styles.moreIcon} />
      </View>

      {/* Chat History */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatHistory}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>No messages yet. Start the conversation!</Text>
        }
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="emoji-emotions" size={24} color="#888" style={styles.icon} />
        <TextInput
          style={[styles.textInput, { height: Math.max(40, newMessage.length / 20 * 30) }]}  // Adjust height dynamically based on content length
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          placeholderTextColor="#888"
          multiline={true} // Allows the input box to expand vertically
        />
        <TouchableOpacity onPress={sendMessage}>
          <MaterialIcons
            name={newMessage.trim() === '' ? 'mic' : 'send'}
            size={24}
            color="#075E54"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ECE5DD' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#075E54', padding: 10, height: 60 },
  profilePicture: { width: 40, height: 40, borderRadius: 20, marginHorizontal: 10 },
  contactName: { flex: 1, fontSize: 18, fontWeight: 'bold', color: '#fff' },
  moreIcon: { marginLeft: 10 },
  chatHistory: { paddingHorizontal: 10, paddingTop: 10 },
  dateHeader: { alignSelf: 'center', backgroundColor: '#DCF8C6', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, marginVertical: 8 },
  dateText: { fontSize: 12, color: '#666' },
  messageRow: { flexDirection: 'row', marginVertical: 4 },
  userRow: { justifyContent: 'flex-end' },
  candidateRow: { justifyContent: 'flex-start' },
  chatProfilePicture: { width: 30, height: 30, borderRadius: 15, marginRight: 10 },
  messageContainer: { maxWidth: '70%', padding: 10, borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  userMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  candidateMessage: { backgroundColor: '#fff', alignSelf: 'flex-start' },
  messageText: { fontSize: 16, color: '#333' },
  timestamp: { fontSize: 12, color: '#888', marginTop: 5, alignSelf: 'flex-end' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#ccc' },
  textInput: {
    flex: 1,
    backgroundColor: '#ECE5DD',
    borderRadius: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    marginHorizontal: 10,
    color: '#333',
    // No fixed height, will be determined dynamically
  },
  icon: { marginRight: 10 },
  emptyMessage: { textAlign: 'center', color: '#888', fontSize: 16, marginTop: 20 },
  senderName: { fontSize: 14, fontWeight: 'bold', color: '#075E54', marginBottom: 4 },
});

export default ChatScreen;
