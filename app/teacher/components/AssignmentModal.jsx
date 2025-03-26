import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity, 
    Platform, 
    Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';

export default function AssignmentPage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);

    const handleFilePick = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.type === 'success') {
            setFile(result);
        }
    };

    const handleUpload = () => {
        if (!title || !description || !file) {
            Alert.alert('Error', 'Please fill in all fields and select a file');
            return;
        }

        // Handle the file upload logic here
        Alert.alert('Success', 'Assignment uploaded successfully');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Upload Assignment</Text>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
            />
            <TouchableOpacity style={styles.fileButton} onPress={handleFilePick}>
                <MaterialIcons name="attach-file" size={24} color="#fff" />
                <Text style={styles.fileButtonText}>
                    {file ? file.name : 'Select File'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
                <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
    },
    fileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        marginBottom: 20,
    },
    fileButtonText: {
        color: '#fff',
        marginLeft: 10,
    },
    uploadButton: {
        padding: 15,
        backgroundColor: '#27AE60',
        borderRadius: 10,
        alignItems: 'center',
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});