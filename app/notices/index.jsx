import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NoticesScreen() {
  const notices = [
    {
      id: 1,
      title: 'End Semester Examination Schedule',
      date: '2024-03-20',
      category: 'Exam',
      priority: 'High',
      content: 'End semester examinations for all departments will commence from April 15, 2024. Detailed schedule is available on the college portal.',
      icon: 'event-note'
    },
    {
      id: 2,
      title: 'Summer Vacation Notice',
      date: '2024-03-18',
      category: 'Holiday',
      priority: 'Medium',
      content: 'The college will remain closed for summer vacation from May 15 to June 30, 2024. Classes will resume on July 1, 2024.',
      icon: 'wb-sunny'
    },
    {
      id: 3,
      title: 'Mid-Semester Assignment Submission',
      date: '2024-03-15',
      category: 'Academic',
      priority: 'High',
      content: 'All students must submit their mid-semester assignments by March 30, 2024. Late submissions will not be accepted.',
      icon: 'assignment'
    },
    {
      id: 4,
      title: 'College Foundation Day Celebration',
      date: '2024-03-10',
      category: 'Event',
      priority: 'Medium',
      content: 'College Foundation Day will be celebrated on April 5, 2024. All students are required to attend the ceremony.',
      icon: 'celebration'
    },
    {
      id: 5,
      title: 'Fee Payment Reminder',
      date: '2024-03-05',
      category: 'Fee',
      priority: 'High',
      content: 'Last date for semester fee payment is March 31, 2024. Late payment will incur additional charges.',
      icon: 'payment'
    }
  ];

  const getPriorityColor = (priority) => {
    const colors = {
      High: '#FF5252',
      Medium: '#FFA726',
      Low: '#66BB6A'
    };
    return colors[priority] || '#757575';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      Exam: 'school',
      Holiday: 'beach-access',
      Academic: 'menu-book',
      Event: 'event',
      Fee: 'account-balance-wallet'
    };
    return icons[category] || 'notification-important';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notices & Announcements</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {notices.map((notice) => (
          <View key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <View style={styles.categoryContainer}>
                <MaterialIcons name={getCategoryIcon(notice.category)} size={20} color="#666" />
                <Text style={styles.categoryText}>{notice.category}</Text>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(notice.priority) }]}>
                <Text style={styles.priorityText}>{notice.priority}</Text>
              </View>
            </View>

            <Text style={styles.noticeTitle}>{notice.title}</Text>
            <Text style={styles.noticeContent}>{notice.content}</Text>

            <View style={styles.noticeFooter}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.dateText}>{formatDate(notice.date)}</Text>
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
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#F39C12',
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
  noticeCard: {
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
  noticeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  noticeContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  noticeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#666',
  }
});