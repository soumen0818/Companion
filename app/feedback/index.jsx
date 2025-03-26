import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FeedbackScreen() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [overallRating, setOverallRating] = useState(0);
  const [categoryRatings, setCategoryRatings] = useState({});
  const [feedback, setFeedback] = useState('');
  const [submittedSubjects, setSubmittedSubjects] = useState([]);

  const subjects = [
    {
      id: 1,
      name: 'Data Structures',
      professor: 'Dr. Amit Kumar',
      schedule: 'Monday - 10:00 AM',
      lastFeedback: '2 weeks ago'
    },
    {
      id: 2,
      name: 'Database Management',
      professor: 'Prof. Priya Singh',
      schedule: 'Tuesday - 11:00 AM',
      lastFeedback: '1 week ago'
    },
    {
      id: 3,
      name: 'Computer Networks',
      professor: 'Dr. Rajesh Verma',
      schedule: 'Wednesday - 09:00 AM',
      lastFeedback: 'Not submitted'
    }
  ];

  const feedbackCategories = [
    'Teaching Quality',
    'Content Clarity',
    'Doubt Resolution',
    'Class Management',
    'Practical Examples'
  ];

  const renderStars = (category = 'overall', currentRating = 0) => {
    return (
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity 
            key={star} 
            onPress={() => {
              if (category === 'overall') {
                setOverallRating(star);
              } else {
                setCategoryRatings(prev => ({
                  ...prev,
                  [category]: star
                }));
              }
            }}
          >
            <MaterialIcons 
              name={star <= (category === 'overall' ? overallRating : categoryRatings[category] || 0) ? 'star' : 'star-border'} 
              size={32} 
              color={star <= (category === 'overall' ? overallRating : categoryRatings[category] || 0) ? '#F39C12' : '#bbb'} 
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleSubmit = () => {
    if (selectedSubject) {
      setSubmittedSubjects(prev => [...prev, selectedSubject.id]);
      setOverallRating(0);
      setCategoryRatings({});
      setFeedback('');
      // Here you would typically send the feedback to your backend
      alert('Feedback submitted successfully!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Feedback</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Subject</Text>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectCard,
                selectedSubject?.id === subject.id && styles.selectedSubject
              ]}
              onPress={() => setSelectedSubject(subject)}
            >
              <View style={styles.subjectInfo}>
                <Text style={styles.subjectName}>{subject.name}</Text>
                <Text style={styles.professorName}>{subject.professor}</Text>
                <Text style={styles.scheduleText}>{subject.schedule}</Text>
              </View>
              <View style={styles.feedbackStatus}>
                <Text style={styles.statusText}>{subject.lastFeedback}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {selectedSubject && !submittedSubjects.includes(selectedSubject.id) ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Rate Your Experience</Text>
              {renderStars('overall', overallRating)}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Feedback Categories</Text>
              {feedbackCategories.map((category, index) => (
                <View key={index} style={styles.categoryItem}>
                  <Text style={styles.categoryText}>{category}</Text>
                  {renderStars(category, categoryRatings[category] || 0)}
                </View>
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Comments</Text>
              <TextInput
                style={styles.commentInput}
                multiline
                numberOfLines={4}
                placeholder="Share your thoughts about the class..."
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>

            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </>
        ) : selectedSubject && (
          <View style={styles.section}>
            <View style={styles.submittedMessage}>
              <MaterialIcons name="check-circle" size={48} color="#1ABC9C" />
              <Text style={styles.submittedText}>Feedback Submitted</Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#1ABC9C',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subjectCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  selectedSubject: {
    borderColor: '#1ABC9C',
    backgroundColor: '#E8F8F5',
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  professorName: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  scheduleText: {
    fontSize: 12,
    color: '#888',
  },
  feedbackStatus: {
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    color: '#888',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#1ABC9C',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  submittedMessage: {
    alignItems: 'center',
    padding: 20,
  },
  submittedText: {
    fontSize: 18,
    color: '#1ABC9C',
    fontWeight: '600',
    marginTop: 12,
  },
});