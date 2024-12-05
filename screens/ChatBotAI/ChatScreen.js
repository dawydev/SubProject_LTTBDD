import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../../../SubProject_LTTBDD/config.env'; // Ensure this path is correct

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const ChatScreen = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    { id: '0', text: 'Tôi là trợ lý AI, tôi có thể giúp gì được cho bạn ?', isUser: false }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = async () => {
    if (inputMessage.trim()) {
      const newMessage = { id: messages.length.toString(), text: inputMessage, isUser: true };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini', // Ensure you are using the correct model
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...messages.map(msg => ({ role: msg.isUser ? 'user' : 'assistant', content: msg.text })),
            { role: 'user', content: inputMessage },
          ],
        });

        const aiMessage = { id: (messages.length + 1).toString(), text: response.choices[0].message.content.trim(), isUser: false };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>

        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
          contentContainerStyle={styles.messagesList}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <MaterialCommunityIcons name="send" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  backButton: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#00BDDA',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
  },
  messageText: {
    color: '#000', // Change text color for AI messages
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#00BDDA',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatScreen;