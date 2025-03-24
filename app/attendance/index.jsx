import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function AttendanceScreen() {
  const router = useRouter();
  const subjects = [
    { name: 'Data Structures', present: 32, total: 36, percentage: 88.9 },
    { name: 'Database Systems', present: 28, total: 34, percentage: 82.4 },
    { name: 'Computer Networks', present: 30, total: 35, percentage: 85.7 },
    { name: 'Operating Systems', present: 33, total: 36, percentage: 91.7 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Attendance Overview</Text>
        <View style={styles.overallContainer}>
          <Text style={styles.overallText}>Overall Attendance</Text>
          <Text style={styles.overallPercentage}>87.2%</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subjectsContainer}>
          {subjects.map((subject, index) => (
            <View key={index} style={styles.subjectCard}>
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <MaterialIcons 
                  name={subject.percentage >= 75 ? 'check-circle' : 'warning'} 
                  size={24} 
                  color={subject.percentage >= 75 ? '#4CAF50' : '#FF9800'} 
                />
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>
                  {subject.present}/{subject.total} Classes
                </Text>
                <Text style={[
                  styles.percentageText,
                  { color: subject.percentage >= 75 ? '#4CAF50' : '#FF9800' }
                ]}>
                  {subject.percentage.toFixed(1)}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  backButton: {
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: Platform.OS === 'ios' ? 90 : 60,
  },
  overallContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
  },
  overallText: {
    color: '#fff',
    fontSize: 16,
  },
  overallPercentage: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  subjectsContainer: {
    padding: 20,
  },
  subjectCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#666',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '600',
  }
});