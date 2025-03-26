import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    ScrollView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ReportsModal({ visible, onClose }) {
    const reports = [
        {
            subject: 'Data Structures',
            teacher: 'Dr. Amit Kumar',
            date: '2024-03-20',
            type: 'Mid Semester',
            grade: 'A',
            marks: '85/100',
            remarks: 'Excellent performance in problem-solving. Shows good understanding of algorithms.',
            improvements: 'Can work on time complexity optimization.'
        },
        {
            subject: 'Database Management',
            teacher: 'Prof. Priya Singh',
            date: '2024-03-15',
            type: 'Assignment',
            grade: 'B+',
            marks: '78/100',
            remarks: 'Good understanding of SQL concepts.',
            improvements: 'Need to focus more on normalization concepts.'
        },
        {
            subject: 'Computer Networks',
            teacher: 'Dr. Rajesh Verma',
            date: '2024-03-10',
            type: 'Project',
            grade: 'A+',
            marks: '95/100',
            remarks: 'Outstanding project implementation.',
            improvements: 'Can explore advanced networking protocols.'
        }
    ];

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
                        <Text style={styles.modalTitle}>Academic Reports</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.reportsList}>
                        {reports.map((report, index) => (
                            <View key={index} style={styles.reportCard}>
                                <View style={styles.reportHeader}>
                                    <View>
                                        <Text style={styles.subjectName}>{report.subject}</Text>
                                        <Text style={styles.teacherName}>{report.teacher}</Text>
                                    </View>
                                    <View style={styles.gradeContainer}>
                                        <Text style={styles.grade}>{report.grade}</Text>
                                        <Text style={styles.marks}>{report.marks}</Text>
                                    </View>
                                </View>

                                <View style={styles.reportInfo}>
                                    <View style={styles.infoRow}>
                                        <MaterialIcons name="event" size={16} color="#666" />
                                        <Text style={styles.infoText}>{report.date}</Text>
                                    </View>
                                    <View style={styles.infoRow}>
                                        <MaterialIcons name="assignment" size={16} color="#666" />
                                        <Text style={styles.infoText}>{report.type}</Text>
                                    </View>
                                </View>

                                <View style={styles.remarksSection}>
                                    <Text style={styles.remarksTitle}>Remarks</Text>
                                    <Text style={styles.remarksText}>{report.remarks}</Text>
                                </View>

                                <View style={styles.improvementSection}>
                                    <Text style={styles.improvementTitle}>Areas of Improvement</Text>
                                    <Text style={styles.improvementText}>{report.improvements}</Text>
                                </View>
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
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    reportsList: {
        padding: 15,
    },
    reportCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    subjectName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    teacherName: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    gradeContainer: {
        alignItems: 'center',
    },
    grade: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#27AE60',
    },
    marks: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    reportInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        marginLeft: 5,
        fontSize: 13,
        color: '#666',
    },
    remarksSection: {
        marginBottom: 12,
    },
    remarksTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    remarksText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    improvementSection: {
        backgroundColor: '#FEF9E7',
        padding: 10,
        borderRadius: 8,
    },
    improvementTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#F39C12',
        marginBottom: 4,
    },
    improvementText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    }
});