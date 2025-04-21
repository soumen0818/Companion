import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function NotesUpload() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);

    const handleFilePick = async () => {
        const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
        if (result.type === 'success') setFile(result);
    };

    const handleSubmit = () => {
        if (!title || !description || !subject || !file) {
            Alert.alert('Error', 'Please fill all fields and select a file');
            return;
        }
        // TODO: send data to backend
        Alert.alert('Success', 'Notes uploaded successfully');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Upload Study Notes</Text>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Subject</Text>
                <TextInput
                    style={styles.input}
                    value={subject}
                    onChangeText={setSubject}
                    placeholder="Enter subject"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter note title"
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    multiline
                    numberOfLines={4}
                />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Select File</Text>
                <TouchableOpacity style={styles.fileButton} onPress={handleFilePick}>
                    <MaterialIcons name="attach-file" size={24} color="#fff" />
                    <Text style={styles.fileButtonText}>{file ? file.name : 'Choose File'}</Text>
                </TouchableOpacity>
            </View>
            {file && (
                <View style={styles.fileInfo}>
                    <Text style={styles.fileInfoText}>Selected File: {file.name}</Text>
                </View>
            )}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Upload Notes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    fileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A90E2',
        padding: 12,
        borderRadius: 8,
    },
    fileButtonText: {
        color: '#fff',
        marginLeft: 10,
        fontSize: 16,
    },
    fileInfo: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
    },
    fileInfoText: {
        fontSize: 16,
        color: '#1a237e',
    },
    submitButton: {
        backgroundColor: '#1a237e',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});