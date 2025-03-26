import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HandbookScreen() {
  const sections = [
    {
      title: 'Subject Notes',
      icon: 'menu-book',
      items: [
        {
          name: 'Data Structures',
          type: 'PDF',
          size: '2.5 MB',
          lastUpdated: '2024-03-20'
        },
        {
          name: 'Database Management',
          type: 'PDF',
          size: '3.1 MB',
          lastUpdated: '2024-03-18'
        },
        {
          name: 'Computer Networks',
          type: 'PDF',
          size: '4.2 MB',
          lastUpdated: '2024-03-15'
        }
      ]
    },
    {
      title: 'Academic Rules',
      icon: 'school',
      items: ['Attendance Policy', 'Examination Rules', 'Grading System']
    },
    {
      title: 'Campus Guidelines',
      icon: 'location-city',
      items: ['Dress Code', 'Library Rules', 'Lab Regulations']
    },
    {
      title: 'Student Services',
      icon: 'people',
      items: ['Counseling', 'Health Services', 'Sports Facilities']
    },
    {
      title: 'Important Contacts',
      icon: 'contact-phone',
      items: ['Emergency Numbers', 'Department Contacts', 'Administration']
    }
  ];

  const renderItem = (item, itemIndex, sectionTitle) => {
    if (sectionTitle === 'Subject Notes') {
      return (
        <TouchableOpacity key={itemIndex} style={styles.noteContainer}>
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
    }
    
    return (
      <TouchableOpacity key={itemIndex} style={styles.itemContainer}>
        <Text style={styles.itemText}>{item}</Text>
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Student Handbook</Text>
        <Text style={styles.headerSubtitle}>2024-25 Academic Year</Text>
      </View>

      {sections.map((section, index) => (
        <View key={index} style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name={section.icon} size={24} color="#007AFF" />
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
          {section.items.map((item, itemIndex) => 
            renderItem(item, itemIndex, section.title)
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  sectionContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#444',
  },
  noteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  noteInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  noteDetails: {
    marginLeft: 12,
    flex: 1,
  },
  noteName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  noteMetadata: {
    fontSize: 12,
    color: '#666',
  },
});