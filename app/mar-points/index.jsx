import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function MARPointsScreen() {
  const studentPoints = {
    totalPoints: 850,
    semesterTarget: 1000,
    rank: 12,
    lastUpdated: '2024-03-20'
  };

  const pointCategories = [
    {
      id: 1,
      category: 'Academic Excellence',
      points: 300,
      icon: 'school',
      color: '#3498DB',
      activities: [
        { name: 'Semester CGPA above 9', points: 100 },
        { name: 'Department Topper', points: 150 },
        { name: 'Perfect Attendance', points: 50 }
      ]
    },
    {
      id: 2,
      category: 'Technical Activities',
      points: 250,
      icon: 'code',
      color: '#E74C3C',
      activities: [
        { name: 'Hackathon Participation', points: 75 },
        { name: 'Technical Paper Publication', points: 100 },
        { name: 'Workshop Completion', points: 75 }
      ]
    },
    {
      id: 3,
      category: 'Extra-Curricular',
      points: 200,
      icon: 'sports-esports',
      color: '#27AE60',
      activities: [
        { name: 'Sports Tournament', points: 50 },
        { name: 'Cultural Event', points: 50 },
        { name: 'Club Leadership', points: 100 }
      ]
    },
    {
      id: 4,
      category: 'Social Responsibility',
      points: 100,
      icon: 'volunteer-activism',
      color: '#F39C12',
      activities: [
        { name: 'Blood Donation', points: 30 },
        { name: 'Social Service', points: 40 },
        { name: 'Environmental Initiative', points: 30 }
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MAR Points Dashboard</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.pointsSummary}>
          <View style={styles.totalPoints}>
            <Text style={styles.pointsNumber}>{studentPoints.totalPoints}</Text>
            <Text style={styles.pointsLabel}>Total Points</Text>
          </View>
          <View style={styles.pointsStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="emoji-events" size={24} color="#F39C12" />
              <Text style={styles.statValue}>Rank #{studentPoints.rank}</Text>
              <Text style={styles.statLabel}>Class Rank</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="target" size={24} color="#27AE60" />
              <Text style={styles.statValue}>{studentPoints.semesterTarget}</Text>
              <Text style={styles.statLabel}>Semester Target</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Points Breakdown</Text>
          {pointCategories.map((category) => (
            <TouchableOpacity key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryHeader}>
                <View style={[styles.iconContainer, { backgroundColor: category.color }]}>
                  <MaterialIcons name={category.icon} size={24} color="#FFF" />
                </View>
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryTitle}>{category.category}</Text>
                  <Text style={styles.categoryPoints}>{category.points} points</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#666" />
              </View>
              <View style={styles.activitiesList}>
                {category.activities.map((activity, index) => (
                  <View key={index} style={styles.activityItem}>
                    <Text style={styles.activityName}>{activity.name}</Text>
                    <Text style={styles.activityPoints}>+{activity.points}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.historyButton}>
          <MaterialIcons name="history" size={20} color="#FFF" />
          <Text style={styles.historyButtonText}>View Points History</Text>
        </TouchableOpacity>
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
    backgroundColor: '#9B59B6',
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
  pointsSummary: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalPoints: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  pointsLabel: {
    fontSize: 16,
    color: '#666',
  },
  pointsStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    marginLeft: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryPoints: {
    fontSize: 14,
    color: '#666',
  },
  activitiesList: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  activityName: {
    fontSize: 14,
    color: '#666',
  },
  activityPoints: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '600',
  },
  historyButton: {
    backgroundColor: '#9B59B6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  }
});