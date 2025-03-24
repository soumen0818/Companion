import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  ActivityIndicator 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const botResponses = {
  hello: "Hi there! How can I assist you today?",
  attendance: "You can check your attendance in the Attendance section. Your current attendance is 85%.",
  fees: "Your pending fees for this semester is ₹45,000. Due date is 30th March 2024.",
  schedule: "Your next class is Data Structures at 10:00 AM in Room 301.",
  default: "I'm not sure about that. Please ask about attendance, fees, or class schedule.",
  typing: "College Assistant is typing...",
};

export default function ChatbotScreen() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your college assistant. Ask me about:", isBot: true },
    { id: 2, text: "• Attendance\n• Fees\n• Class Schedule", isBot: true }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');
  const scrollViewRef = useRef();

  useEffect(() => {
    let typingInterval;
    if (isTyping) {
      let dots = '';
      typingInterval = setInterval(() => {
        dots = dots.length < 3 ? dots + '.' : '';
        setTypingText(`${botResponses.typing}${dots}`);
      }, 500);
    }
    return () => clearInterval(typingInterval);
  }, [isTyping]);

  const getBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('hello') || input.includes('hi')) return botResponses.hello;
    if (input.includes('attendance')) return botResponses.attendance;
    if (input.includes('fees') || input.includes('payment')) return botResponses.fees;
    if (input.includes('schedule') || input.includes('class')) return botResponses.schedule;
    return botResponses.default;
  };

  const handleSend = async () => {
    if (inputText.trim()) {
      // Add user message
      const userMessage = {
        id: Date.now(),
        text: inputText.trim(),
        isBot: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);
      setInputText('');
      setIsTyping(true);

      // Scroll to bottom
      scrollViewRef.current?.scrollToEnd({ animated: true });

      // Wait for bot response
      setTimeout(() => {
        const botResponse = getBotResponse(userMessage.text);
        const botMessage = {
          id: Date.now() + 1,
          text: botResponse,
          isBot: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsTyping(false);
        
        // Scroll to bottom after bot response
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }, 1500);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
    >
      <View style={styles.header}>
        <MaterialIcons name="android" size={24} color="#fff" style={styles.headerIcon} />
        <Text style={styles.headerTitle}>College Assistant</Text>
      </View>

      <View style={styles.chatContainer}>
        <ScrollView 
          style={styles.messagesContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.isBot ? styles.botMessage : styles.userMessage,
              ]}
            >
              {message.isBot && (
                <MaterialIcons name="android" size={20} color="#007AFF" style={styles.botIcon} />
              )}
              <View style={styles.messageContent}>
                <Text style={[
                  styles.messageText,
                  !message.isBot && styles.userMessageText
                ]}>
                  {message.text}
                </Text>
                <Text style={[
                  styles.timestamp,
                  !message.isBot && styles.userTimestamp
                ]}>
                  {message.timestamp}
                </Text>
              </View>
            </View>
          ))}
          {isTyping && (
            <View style={[styles.messageContainer, styles.botMessage]}>
              <MaterialIcons name="android" size={20} color="#007AFF" style={styles.botIcon} />
              <View style={styles.typingIndicator}>
                <Text style={styles.typingText}>{typingText}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        <View style={styles.inputWrapper}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type your message..."
              placeholderTextColor="#666"
              multiline
              maxLength={200}
            />
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled
              ]} 
              onPress={handleSend}
              disabled={!inputText.trim()}
            >
              <MaterialIcons 
                name="send" 
                size={24} 
                color={inputText.trim() ? '#fff' : '#999'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatContainer: {
    flex: 1,
    position: 'relative',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
    paddingBottom: 80, // Add padding to prevent last message from being hidden
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    flexDirection: 'row', // Add this
    alignItems: 'flex-start', // Add this
  },
  botMessage: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    marginRight: 50, // Add this
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
    marginLeft: 50, // Add this
  },
  botIcon: {
    marginRight: 8,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    flexWrap: 'wrap', // Add this
  },
  userMessageText: {
    color: '#fff',
  },
  inputWrapper: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 60, // Account for bottom navigation
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  messageContent: {
    flex: 1,
    flexShrink: 1, // Add this
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  userTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  typingIndicator: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    color: '#666',
    fontSize: 14,
  },
});