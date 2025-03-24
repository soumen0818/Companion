import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import AttendanceCard from '../components/AttendanceCard';

export default function Attendance() {
    const [attendanceData] = useState([
        { name: 'Data Structures', date: '2024-03-25', status: 'Present' },
        { name: 'Database Systems', date: '2024-03-25', status: 'Absent' },
        { name: 'Computer Networks', date: '2024-03-25', status: 'Absent' },
        { name: 'Operating Systems', date: '2024-03-25', status: 'Present' },
    ]);

    const handleMarkAttendance = (item) => {
        // Here you would typically update the attendance status
        console.log(`Marking attendance for ${item.name}`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Attendance</Text>
            <ScrollView style={styles.scrollView}>
                {attendanceData.map((item, index) => (
                    <AttendanceCard
                        key={index}
                        name={item.name}
                        date={item.date}
                        status={item.status}
                        onMarkAttendance={() => handleMarkAttendance(item)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#007AFF',
    },
    scrollView: {
        flex: 1,
        marginBottom: 60, // Add bottom margin to account for BottomNav
    }
});