import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PlacementScreen() {
  const router = useRouter();
  const placementStats = {
    totalPlaced: 856,
    highestPackage: '42.5 LPA',
    averagePackage: '8.2 LPA',
    companiesVisited: 128
  };

  const upcomingDrives = [
    {
      id: 1,
      company: 'TCS Digital',
      date: '2024-04-10',
      package: '7.2 LPA',
      role: 'Software Developer',
      eligibility: 'B.Tech (CSE/IT/ECE)',
      cgpa: '7.5',
      status: 'Upcoming'
    },
    {
      id: 2,
      company: 'Infosys',
      date: '2024-04-15',
      package: '6.5 LPA',
      role: 'Systems Engineer',
      eligibility: 'All B.Tech Branches',
      cgpa: '6.5',
      status: 'Registration Open'
    },
    {
      id: 3,
      company: 'Wipro',
      date: '2024-04-20',
      package: '5.5 LPA',
      role: 'Project Engineer',
      eligibility: 'B.Tech/MCA',
      cgpa: '6.0',
      status: 'Coming Soon'
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Navigate to application form with drive details
  const handleApplyNow = (drive) => {
    router.push({
      pathname: '/placement/apply',
      params: { driveId: drive.id, company: drive.company, role: drive.role }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Placements</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="people" size={24} color="#3498DB" />
            <Text style={styles.statNumber}>{placementStats.totalPlaced}</Text>
            <Text style={styles.statLabel}>Students Placed</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="trending-up" size={24} color="#E74C3C" />
            <Text style={styles.statNumber}>{placementStats.highestPackage}</Text>
            <Text style={styles.statLabel}>Highest Package</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialIcons name="business" size={24} color="#27AE60" />
            <Text style={styles.statNumber}>{placementStats.companiesVisited}</Text>
            <Text style={styles.statLabel}>Companies</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Placement Drives</Text>
          {upcomingDrives.map((drive) => (
            <View key={drive.id} style={styles.driveCard}>
              <View style={styles.driveHeader}>
                <Text style={styles.companyName}>{drive.company}</Text>
                <View style={[styles.statusBadge, 
                  { backgroundColor: drive.status === 'Registration Open' ? '#27AE60' : '#3498DB' }]}>
                  <Text style={styles.statusText}>{drive.status}</Text>
                </View>
              </View>
              
              <View style={styles.driveDetails}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="work" size={16} color="#666" />
                  <Text style={styles.detailText}>{drive.role}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="account-balance-wallet" size={16} color="#666" />
                  <Text style={styles.detailText}>{drive.package}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="event" size={16} color="#666" />
                  <Text style={styles.detailText}>{formatDate(drive.date)}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="school" size={16} color="#666" />
                  <Text style={styles.detailText}>CGPA: {drive.cgpa}+</Text>
                </View>
              </View>

              <Text style={styles.eligibility}>Eligibility: {drive.eligibility}</Text>

              <TouchableOpacity style={styles.applyButton} onPress={() => handleApplyNow(drive)}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#3498DB',
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
  driveCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  driveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  driveDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  eligibility: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  applyButton: {
    backgroundColor: '#3498DB',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});