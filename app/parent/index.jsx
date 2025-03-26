import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity,
    Platform,
    Image 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ContactsModal from './components/ContactsModal';
import ReportsModal from './components/ReportsModal';
import CalendarModal from './components/CalendarModal';
import PaymentModal from './components/PaymentModal';

export default function ParentDashboard() {
    const [showContacts, setShowContacts] = useState(false);
    const [showReports, setShowReports] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    const studentInfo = {
        name: "Suman Pradhan",
        class: "B.Tech CSE",
        semester: "4th",
        rollNumber: "21CS123"
    };

    const academicStats = {
        attendance: "85%",
        cgpa: "8.5",
        lastAttended: "2024-03-25",
        pendingFees: "₹25,000"
    };

    const recentFeedback = [
        {
            subject: "Data Structures",
            teacher: "Dr. Amit Kumar",
            date: "2024-03-20",
            comment: "Good performance in recent assignments"
        },
        {
            subject: "Database Management",
            teacher: "Prof. Priya Singh",
            date: "2024-03-18",
            comment: "Needs to improve class participation"
        }
    ];

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <Image
                            source={require('../../assets/students-avature.jpeg')}
                            style={styles.avatar}
                        />
                        <View style={styles.profileInfo}>
                            <Text style={styles.headerTitle}>Welcome Back!</Text>
                            <Text style={styles.studentName}>{studentInfo.name}</Text>
                            <View style={styles.badgeContainer}>
                                <MaterialIcons name="school" size={16} color="#fff" />
                                <Text style={styles.studentInfo}>
                                    {studentInfo.class} • {studentInfo.semester}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#E8F5FE' }]}>
                            <MaterialIcons name="timeline" size={24} color="#4A90E2" />
                            <Text style={[styles.statValue, { color: '#4A90E2' }]}>
                                {academicStats.attendance}
                            </Text>
                            <Text style={styles.statLabel}>Attendance</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#FEF5E7' }]}>
                            <MaterialIcons name="school" size={24} color="#F39C12" />
                            <Text style={[styles.statValue, { color: '#F39C12' }]}>
                                {academicStats.cgpa}
                            </Text>
                            <Text style={styles.statLabel}>CGPA</Text>
                        </View>
                    </View>

                    <View style={[styles.paymentCard, { backgroundColor: '#F8F9FA' }]}>
                        <View style={styles.paymentInfo}>
                            <Text style={styles.paymentTitle}>Pending Fees</Text>
                            <Text style={styles.paymentAmount}>{academicStats.pendingFees}</Text>
                        </View>
                        <TouchableOpacity 
                            style={styles.payButton}
                            onPress={() => setShowPayment(true)}
                        >
                            <Text style={styles.payButtonText}>Pay Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Teacher's Feedback</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    {recentFeedback.map((feedback, index) => (
                        <View key={index} style={styles.feedbackCard}>
                            <View style={styles.feedbackIconContainer}>
                                <MaterialIcons name="assignment" size={24} color="#4A90E2" />
                            </View>
                            <View style={styles.feedbackContent}>
                                <View style={styles.feedbackHeader}>
                                    <Text style={styles.subjectName}>{feedback.subject}</Text>
                                    <Text style={styles.feedbackDate}>{feedback.date}</Text>
                                </View>
                                <Text style={styles.teacherName}>{feedback.teacher}</Text>
                                <Text style={styles.feedbackText}>{feedback.comment}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.quickActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: '#4A90E2' }]}
                        onPress={() => setShowContacts(true)}
                    >
                        <MaterialIcons name="chat" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Contacts</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: '#27AE60' }]}
                        onPress={() => setShowReports(true)}
                    >
                        <MaterialIcons name="description" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Reports</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: '#E74C3C' }]}
                        onPress={() => setShowCalendar(true)}
                    >
                        <MaterialIcons name="calendar-today" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Calendar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <ContactsModal 
                visible={showContacts} 
                onClose={() => setShowContacts(false)} 
            />
            <ReportsModal 
                visible={showReports} 
                onClose={() => setShowReports(false)} 
            />
            <CalendarModal 
                visible={showCalendar} 
                onClose={() => setShowCalendar(false)} 
            />
            <PaymentModal 
                visible={showPayment}
                onClose={() => setShowPayment(false)}
                amount={academicStats.pendingFees}
            />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#4A90E2',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#fff',
    },
    profileInfo: {
        flex: 1,
    },
    headerTitle: {
        fontSize: 14,
        color: '#fff',
        opacity: 0.9,
    },
    studentName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 4,
    },
    badgeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 15,
        alignSelf: 'flex-start',
    },
    studentInfo: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 4,
    },
    statsContainer: {
        padding: 15,
        marginTop: -30,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    statCard: {
        flex: 1,
        padding: 15,
        borderRadius: 20,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    statLabel: {
        fontSize: 13,
        color: '#666',
    },
    paymentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 20,
        marginHorizontal: 5,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 14,
        color: '#666',
    },
    paymentAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 4,
    },
    payButton: {
        backgroundColor: '#27AE60',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 15,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    section: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAllText: {
        fontSize: 14,
        color: '#4A90E2',
    },
    feedbackCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#eee',
    },
    feedbackIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E8F5FE',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    feedbackContent: {
        flex: 1,
    },
    feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 6,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    feedbackDate: {
        fontSize: 12,
        color: '#888',
    },
    teacherName: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    feedbackText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        paddingBottom: 30,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        padding: 12,
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 13,
        fontWeight: '600',
        marginTop: 4,
    }
});