import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CalendarModal({ visible, onClose }) {
    const [currentWeek, setCurrentWeek] = useState(1);
    
    const weeklyAttendance = {
        month: "March 2024",
        weekNumber: 4,
        days: [
            {
                date: "2024-03-25",
                day: "Monday",
                schedule: [
                    { subject: "Data Structures", status: "present", time: "9:00 AM" },
                    { subject: "Database Management", status: "present", time: "11:00 AM" }
                ]
            },
            {
                date: "2024-03-26",
                day: "Tuesday",
                schedule: [
                    { subject: "Computer Networks", status: "absent", time: "10:00 AM" },
                    { subject: "Data Structures", status: "present", time: "2:00 PM" }
                ]
            },
            {
                date: "2024-03-27",
                day: "Wednesday",
                schedule: [
                    { subject: "Database Management", status: "late", time: "9:00 AM" },
                    { subject: "Computer Networks", status: "present", time: "11:00 AM" }
                ]
            },
            {
                date: "2024-03-28",
                day: "Thursday",
                schedule: [
                    { subject: "Data Structures", status: "present", time: "10:00 AM" },
                    { subject: "Database Management", status: "present", time: "2:00 PM" }
                ]
            },
            {
                date: "2024-03-29",
                day: "Friday",
                schedule: [
                    { subject: "Computer Networks", status: "present", time: "9:00 AM" },
                    { subject: "Data Structures", status: "present", time: "11:00 AM" }
                ]
            }
        ]
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'present': return '#27AE60';
            case 'absent': return '#E74C3C';
            case 'late': return '#F39C12';
            default: return '#95A5A6';
        }
    };

    const getWeeklyStats = () => {
        let total = 0;
        let present = 0;
        let absent = 0;
        let late = 0;

        weeklyAttendance.days.forEach(day => {
            day.schedule.forEach(session => {
                total++;
                if (session.status === 'present') present++;
                if (session.status === 'absent') absent++;
                if (session.status === 'late') late++;
            });
        });

        return { total, present, absent, late };
    };

    const stats = getWeeklyStats();

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <View style={styles.headerInfo}>
                            <Text style={styles.monthText}>{weeklyAttendance.month}</Text>
                            <Text style={styles.weekText}>Week {weeklyAttendance.weekNumber}</Text>
                        </View>
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: '#27AE60' }]}>{stats.present}</Text>
                            <Text style={styles.statLabel}>Present</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: '#E74C3C' }]}>{stats.absent}</Text>
                            <Text style={styles.statLabel}>Absent</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: '#F39C12' }]}>{stats.late}</Text>
                            <Text style={styles.statLabel}>Late</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.weeklyView}>
                        {weeklyAttendance.days.map((day, dayIndex) => (
                            <View key={dayIndex} style={styles.dayCard}>
                                <View style={styles.dayHeader}>
                                    <Text style={styles.dayName}>{day.day}</Text>
                                    <Text style={styles.dateText}>
                                        {new Date(day.date).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </Text>
                                </View>
                                
                                {day.schedule.map((session, sessionIndex) => (
                                    <View key={sessionIndex} style={styles.sessionItem}>
                                        <View style={styles.sessionInfo}>
                                            <Text style={styles.timeText}>{session.time}</Text>
                                            <Text style={styles.subjectText}>{session.subject}</Text>
                                        </View>
                                        <View style={[
                                            styles.statusBadge,
                                            { backgroundColor: getStatusColor(session.status) + '20' }
                                        ]}>
                                            <View style={[
                                                styles.statusDot,
                                                { backgroundColor: getStatusColor(session.status) }
                                            ]} />
                                            <Text style={[
                                                styles.statusText,
                                                { color: getStatusColor(session.status) }
                                            ]}>
                                                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        maxHeight: '90%',
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    headerInfo: {
        alignItems: 'center',
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    weekText: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        backgroundColor: '#f8f9fa',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    weeklyView: {
        padding: 15,
    },
    dayCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    dayName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    dateText: {
        fontSize: 14,
        color: '#666',
    },
    sessionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    sessionInfo: {
        flex: 1,
    },
    timeText: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    subjectText: {
        fontSize: 14,
        color: '#333',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
    }
});