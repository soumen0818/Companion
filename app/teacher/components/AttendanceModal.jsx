import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    ScrollView,
    TextInput,
    Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function AttendanceModal({ visible, onClose, classInfo }) {
    const [students, setStudents] = useState([
        { id: 1, name: "Arun Kumar", rollNo: "21CS001", status: "present" },
        { id: 2, name: "Priya Singh", rollNo: "21CS002", status: "present" },
        { id: 3, name: "Rahul Sharma", rollNo: "21CS003", status: "absent" },
        { id: 4, name: "Neha Patel", rollNo: "21CS004", status: "present" },
        { id: 5, name: "Amit Verma", rollNo: "21CS005", status: "late" },
        // Add more students as needed
    ]);

    const toggleStatus = (studentId) => {
        setStudents(students.map(student => {
            if (student.id === studentId) {
                const nextStatus = {
                    'present': 'late',
                    'late': 'absent',
                    'absent': 'present'
                };
                return { ...student, status: nextStatus[student.status] };
            }
            return student;
        }));
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'present': return '#27AE60';
            case 'absent': return '#E74C3C';
            case 'late': return '#F39C12';
            default: return '#95A5A6';
        }
    };

    const handleSubmit = () => {
        // Add your attendance submission logic here
        Alert.alert(
            "Success",
            "Attendance has been recorded successfully",
            [{ text: "OK", onPress: onClose }]
        );
    };

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
                        <Text style={styles.modalTitle}>Take Attendance</Text>
                    </View>

                    <View style={styles.classInfo}>
                        <Text style={styles.subjectName}>{classInfo?.subject}</Text>
                        <Text style={styles.classDetails}>
                            {classInfo?.class} • {classInfo?.room}
                        </Text>
                        <Text style={styles.timeText}>{classInfo?.time}</Text>
                    </View>

                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.statusDot, { backgroundColor: '#27AE60' }]} />
                            <Text style={styles.legendText}>Present</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.statusDot, { backgroundColor: '#F39C12' }]} />
                            <Text style={styles.legendText}>Late</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.statusDot, { backgroundColor: '#E74C3C' }]} />
                            <Text style={styles.legendText}>Absent</Text>
                        </View>
                    </View>

                    <ScrollView style={styles.studentList}>
                        {students.map((student) => (
                            <TouchableOpacity 
                                key={student.id} 
                                style={styles.studentCard}
                                onPress={() => toggleStatus(student.id)}
                            >
                                <View style={styles.studentInfo}>
                                    <Text style={styles.studentName}>{student.name}</Text>
                                    <Text style={styles.rollNo}>{student.rollNo}</Text>
                                </View>
                                <View style={[
                                    styles.statusBadge,
                                    { backgroundColor: getStatusColor(student.status) + '20' }
                                ]}>
                                    <View style={[
                                        styles.statusDot,
                                        { backgroundColor: getStatusColor(student.status) }
                                    ]} />
                                    <Text style={[
                                        styles.statusText,
                                        { color: getStatusColor(student.status) }
                                    ]}>
                                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Submit Attendance</Text>
                    </TouchableOpacity>
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
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    classInfo: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
    },
    subjectName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    classDetails: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    timeText: {
        fontSize: 14,
        color: '#4A90E2',
        marginTop: 4,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
    },
    studentList: {
        padding: 15,
    },
    studentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#eee',
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    rollNo: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    statusText: {
        fontSize: 13,
        fontWeight: '500',
    },
    submitButton: {
        backgroundColor: '#4A90E2',
        margin: 15,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});