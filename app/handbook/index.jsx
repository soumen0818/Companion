import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function HandbookScreen() {
  const sections = [
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
          {section.items.map((item, itemIndex) => (
            <TouchableOpacity key={itemIndex} style={styles.itemContainer}>
              <Text style={styles.itemText}>{item}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
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
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
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
  }
});