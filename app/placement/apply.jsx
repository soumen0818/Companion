// app/placement/apply.jsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker'; // for resume upload

export default function ApplyScreen() {
  const router = useRouter();
  const { driveId, company, role } = useLocalSearchParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resumeLink, setResumeLink] = useState('');
  const [phone, setPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleSubmit = () => {
    // TODO: replace with real API call
    if (!name || !email || !phone || !coverLetter || !resumeFile) {
      Alert.alert('Please fill all fields');
      return;
    }
    Alert.alert(
      'Application Submitted',
      `You’ve applied to ${company} for the ${role} role.`,
      [{ text: 'OK', onPress: () => router.back() }]
    );
  };

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
    if (result.type === 'success') setResumeFile(result);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Apply for {role}</Text>
      </View>
      {/* Company subtitle */}
      <Text style={styles.subtitle}>{company}</Text>

      {/* Form fields */}
      <TextInput style={styles.input} placeholder="Your Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email Address" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextInput style={[styles.input, styles.textArea]} placeholder="Cover Letter" value={coverLetter} onChangeText={setCoverLetter} multiline numberOfLines={4} />

      {/* Resume picker */}
      <TouchableOpacity style={styles.fileButton} onPress={pickResume}>
        <MaterialIcons name="attach-file" size={24} color="#fff" />
        <Text style={styles.fileButtonText}>{resumeFile?.name || 'Upload Resume (PDF)'}</Text>
      </TouchableOpacity>

      {/* Submit button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
    flexGrow: 1
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#333',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#3498DB',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  fileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
});