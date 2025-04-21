import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Sample data - Replace with actual data fetching logic
const allHandbooks = [
  {
    subject: 'Data Structures',
    name: 'DS Handbook Vol. 1',
    type: 'PDF',
    size: '2.5 MB',
    lastUpdated: '2024-03-20',
    url: 'https://example.com/pdfs/data-structures-v1.pdf' // Placeholder URL
  },
  {
    subject: 'Data Structures',
    name: 'DS Algorithms Guide',
    type: 'PDF',
    size: '1.8 MB',
    lastUpdated: '2024-03-15',
    url: 'https://example.com/pdfs/data-structures-algo.pdf' // Placeholder URL
  },
  {
    subject: 'Database Management',
    name: 'DBMS Concepts',
    type: 'PDF',
    size: '3.1 MB',
    lastUpdated: '2024-03-18',
    url: 'https://example.com/pdfs/dbms-concepts.pdf' // Placeholder URL
  },
  {
    subject: 'Computer Networks',
    name: 'Networking Fundamentals',
    type: 'PDF',
    size: '4.2 MB',
    lastUpdated: '2024-03-15',
    url: 'https://example.com/pdfs/cn-fundamentals.pdf' // Placeholder URL
  },
  // Add more handbooks for different subjects
];

export default function HandbookScreen() {
  // Extract unique subjects from the handbook data
  const subjects = useMemo(() => [
    ...new Set(allHandbooks.map(item => item.subject))
  ], []);

  const [selectedSubject, setSelectedSubject] = useState(subjects[0] || null); // Default to the first subject

  // Filter handbooks based on the selected subject
  const filteredHandbooks = useMemo(() =>
    allHandbooks.filter(item => item.subject === selectedSubject)
  , [selectedSubject]);

  const handleOpenPdf = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const renderNoteItem = (item, itemIndex) => {
    return (
      <TouchableOpacity
        key={itemIndex}
        style={styles.noteContainer}
        onPress={() => handleOpenPdf(item.url)}
      >
        <View style={styles.noteInfo}>
          <MaterialIcons name="description" size={24} color="#007AFF" />
          <View style={styles.noteDetails}>
            <Text style={styles.noteName}>{item.name}</Text>
            <Text style={styles.noteMetadata}>
              {item.type} • {item.size} • Updated {item.lastUpdated}
            </Text>
          </View>
        </View>
        <MaterialIcons name="download" size={24} color="#666" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Handbook</Text>
      </View>

      {/* Subject Selector */}
      <View style={styles.selectorContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.selectorScroll}>
          {subjects.map((subject, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.subjectChip,
                selectedSubject === subject && styles.selectedSubjectChip
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <Text style={[
                styles.subjectChipText,
                selectedSubject === subject && styles.selectedSubjectChipText
              ]}>
                {subject}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Handbooks List */}
      <ScrollView style={styles.listContainer}>
        {selectedSubject ? (
          filteredHandbooks.length > 0 ? (
            filteredHandbooks.map((item, itemIndex) =>
              renderNoteItem(item, itemIndex)
            )
          ) : (
            <Text style={styles.noDataText}>No handbooks found for {selectedSubject}.</Text>
          )
        ) : (
          <Text style={styles.noDataText}>Please select a subject.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#007AFF',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  selectorContainer: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectorScroll: {
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  subjectChip: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e9ecef',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  selectedSubjectChip: {
    backgroundColor: '#007AFF',
    borderColor: '#0056b3',
  },
  subjectChipText: {
    fontSize: 14,
    color: '#495057',
    fontWeight: '500',
  },
  selectedSubjectChipText: {
    color: '#fff',
  },
  listContainer: {
    flex: 1,
    padding: 15,
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  noteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  noteDetails: {
    marginLeft: 15, // Increased spacing from icon
    flex: 1,
  },
  noteName: {
    fontSize: 16,
    fontWeight: '600', // Slightly bolder
    color: '#343a40',
    marginBottom: 5,
  },
  noteMetadata: {
    fontSize: 12,
    color: '#6c757d',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#6c757d',
  },
}); // Ensure closing brace and parenthesis are correct