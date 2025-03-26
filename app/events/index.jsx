import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function EventsScreen() {
  const router = useRouter();
  
  const events = [
    {
      id: 1,
      title: 'Annual Tech Fest 2024',
      date: '2024-04-15',
      time: '09:00 AM',
      venue: 'College Auditorium',
      category: 'Technical',
      description: 'Annual technical festival featuring coding competitions, project exhibitions, and guest lectures from industry experts.',
      icon: 'computer'
    },
    {
      id: 2,
      title: 'Campus Recruitment Drive',
      date: '2024-04-20',
      time: '10:00 AM',
      venue: 'Seminar Hall',
      category: 'Placement',
      description: 'Major IT companies visiting for recruitment. Open for final year students across all departments.',
      icon: 'business'
    },
    {
      id: 3,
      title: 'Cultural Fest',
      date: '2024-05-01',
      time: '11:00 AM',
      venue: 'College Ground',
      category: 'Cultural',
      description: 'Annual cultural festival featuring music, dance, and theatrical performances.',
      icon: 'music-note'
    },
    {
      id: 4,
      title: 'Workshop on AI/ML',
      date: '2024-04-25',
      time: '02:00 PM',
      venue: 'Computer Lab 1',
      category: 'Workshop',
      description: 'Hands-on workshop on Artificial Intelligence and Machine Learning fundamentals.',
      icon: 'psychology'
    },
    {
      id: 5,
      title: 'Sports Tournament',
      date: '2024-05-10',
      time: '08:00 AM',
      venue: 'College Sports Complex',
      category: 'Sports',
      description: 'Inter-department cricket and football tournament.',
      icon: 'sports-cricket'
    }
  ];

  const getEventDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Technical: '#4CAF50',
      Placement: '#2196F3',
      Cultural: '#FF9800',
      Workshop: '#9C27B0',
      Sports: '#F44336'
    };
    return colors[category] || '#757575';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Upcoming Events</Text>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <View style={styles.eventHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(event.category) }]}>
                <MaterialIcons name={event.icon} size={20} color="#fff" />
                <Text style={styles.categoryText}>{event.category}</Text>
              </View>
              <Text style={styles.eventDate}>{getEventDate(event.date)}</Text>
            </View>

            <Text style={styles.eventTitle}>{event.title}</Text>
            
            <Text style={styles.eventDescription}>{event.description}</Text>
            
            <View style={styles.eventDetails}>
              <View style={styles.detailItem}>
                <MaterialIcons name="access-time" size={16} color="#666" />
                <Text style={styles.detailText}>{event.time}</Text>
              </View>
              <View style={styles.detailItem}>
                <MaterialIcons name="location-on" size={16} color="#666" />
                <Text style={styles.detailText}>{event.venue}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 60, // Add padding for bottom navigation
  },
  header: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  backButton: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 16,
    paddingBottom: 100, // Increased padding to ensure last item is visible
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  }
});