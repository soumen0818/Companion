import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AttendanceCard = ({ subject, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.subjectCard}>
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
          <Text
            style={[
              styles.percentageText,
              { color: subject.percentage >= 75 ? '#4CAF50' : '#FF9800' },
            ]}
          >
            {subject.percentage.toFixed(1)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default AttendanceCard;