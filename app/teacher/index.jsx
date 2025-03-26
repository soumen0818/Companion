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
import AttendanceModal from './components/AttendanceModal';
import { useRouter } from "expo-router";

export default function TeacherDashboard() {
    const router = useRouter();
    
    // Add this to handle logout
    const handleLogout = () => {
        // Add logout logic here
        router.replace("/login");
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAttendance, setShowAttendance] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const teacherInfo = {
        name: "Dr. Amit Kumar",
        department: "Computer Science",
        designation: "Associate Professor",
        expertise: "Data Structures & Algorithms"
    };

    const todayClasses = [
        {
            time: "9:00 AM - 10:00 AM",
            subject: "Data Structures",
            class: "B.Tech CSE 2nd Year",
            room: "Room 301",
            attendance: 45
        },
        {
            time: "11:00 AM - 12:00 PM",
            subject: "Algorithm Design",
            class: "B.Tech CSE 3rd Year",
            room: "Room 405",
            attendance: 38
        },
        {
            time: "2:00 PM - 3:00 PM",
            subject: "Database Systems",
            class: "B.Tech CSE 2nd Year",
            room: "Lab 2",
            attendance: 42
        }
    ];

    const studentFeedback = [
        {
            student: "Rohit Sharma",
            class: "B.Tech CSE 3rd Year",
            subject: "Data Structures",
            rating: 4.5,
            comment: "Excellent teaching methodology, very helpful in understanding complex concepts.",
            date: "2024-03-25"
        },
        {
            student: "Priya Patel",
            class: "B.Tech CSE 2nd Year",
            subject: "Algorithm Design",
            rating: 4.8,
            comment: "Great examples and practical applications explained well.",
            date: "2024-03-24"
        }
    ];

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <MaterialIcons 
                    key={i}
                    name={i <= rating ? "star" : "star-border"}
                    size={16}
                    color="#FFD700"
                />
            );
        }
        return stars;
    };

    return (
        <>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.header}>
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <MaterialIcons name="person" size={40} color="#fff" />
                        </View>
                        <View style={styles.profileInfo}>
                            <Text style={styles.name}>{teacherInfo.name}</Text>
                            <Text style={styles.designation}>{teacherInfo.designation}</Text>
                            <View style={styles.departmentBadge}>
                                <MaterialIcons name="school" size={16} color="#fff" />
                                <Text style={styles.department}>{teacherInfo.department}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Stats Section */}
                <View style={styles.statsContainer}>
                    <View style={styles.statsRow}>
                        <View style={[styles.statCard, { backgroundColor: '#E8F5FE' }]}>
                            <MaterialIcons name="people" size={24} color="#4A90E2" />
                            <Text style={[styles.statValue, { color: '#4A90E2' }]}>125</Text>
                            <Text style={styles.statLabel}>Total Students</Text>
                        </View>
                        <View style={[styles.statCard, { backgroundColor: '#FEF5E7' }]}>
                            <MaterialIcons name="today" size={24} color="#F39C12" />
                            <Text style={[styles.statValue, { color: '#F39C12' }]}>3</Text>
                            <Text style={styles.statLabel}>Today's Classes</Text>
                        </View>
                    </View>
                    <View style={styles.statsRow}>
                        <Text style={styles.dateText}>{selectedDate.toDateString()}</Text>
                    </View>
                </View>

                {/* Today's Schedule Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Today's Schedule</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {todayClasses.map((classInfo, index) => (
                        <View key={index} style={styles.classCard}>
                            <View style={styles.classTimeStrip}>
                                <MaterialIcons name="access-time" size={20} color="#4A90E2" />
                                <Text style={styles.classTime}>{classInfo.time}</Text>
                            </View>
                            <View style={styles.classInfo}>
                                <Text style={styles.subjectName}>{classInfo.subject}</Text>
                                <Text style={styles.className}>{classInfo.class}</Text>
                                <View style={styles.classDetails}>
                                    <View style={styles.detailItem}>
                                        <MaterialIcons name="room" size={16} color="#666" />
                                        <Text style={styles.detailText}>{classInfo.room}</Text>
                                    </View>
                                    <View style={styles.detailItem}>
                                        <MaterialIcons name="people" size={16} color="#666" />
                                        <Text style={styles.detailText}>{classInfo.attendance} students</Text>
                                    </View>
                                </View>
                            </View>
                            <TouchableOpacity 
                                style={styles.attendanceButton}
                                onPress={() => setShowAttendance(true)}
                            >
                                <MaterialIcons name="edit" size={20} color="#fff" />
                                <Text style={styles.attendanceButtonText}>Take Attendance</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>

                {/* Recent Feedback Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Feedback</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {studentFeedback.map((feedback, index) => (
                        <View key={index} style={styles.feedbackCard}>
                            <View style={styles.feedbackHeader}>
                                <View>
                                    <Text style={styles.studentName}>{feedback.student}</Text>
                                    <Text style={styles.feedbackClass}>{feedback.class}</Text>
                                </View>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.stars}>
                                        {renderStars(feedback.rating)}
                                    </View>
                                    <Text style={styles.ratingText}>{feedback.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.feedbackText}>{feedback.comment}</Text>
                            <View style={styles.feedbackFooter}>
                                <Text style={styles.feedbackDate}>{feedback.date}</Text>
                                <Text style={styles.feedbackSubject}>{feedback.subject}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                {/* Quick Actions Section */}
                <View style={styles.quickActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, { backgroundColor: '#4A90E2' }]}
                        onPress={() => router.push('/teacher/assignment')}
                    >
                        <MaterialIcons name="assignment" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Assignment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#27AE60' }]}>
                        <MaterialIcons name="grade" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Grades</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E74C3C' }]}>
                        <MaterialIcons name="announcement" size={22} color="#fff" />
                        <Text style={styles.buttonText}>Notices</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <AttendanceModal 
                visible={showAttendance}
                onClose={() => setShowAttendance(false)}
                classInfo={selectedClass}
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
        padding: 20,
        backgroundColor: '#4A90E2',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    designation: {
        fontSize: 14,
        color: '#fff',
        marginTop: 5,
    },
    departmentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    department: {
        fontSize: 12,
        color: '#fff',
        marginLeft: 5,
    },
    statsContainer: {
        padding: 20,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        borderRadius: 10,
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    dateText: {
        fontSize: 16,
        color: '#666',
    },
    section: {
        padding: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeAllText: {
        fontSize: 14,
        color: '#4A90E2',
    },
    classCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        marginBottom: 15,
    },
    classTimeStrip: {
        width: 80,
        alignItems: 'center',
    },
    classTime: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    classInfo: {
        flex: 1,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    className: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    classDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    detailText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 5,
    },
    attendanceButton: {
        padding: 10,
        backgroundColor: '#4A90E2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    attendanceButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    feedbackCard: {
        padding: 15,
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        marginBottom: 15,
    },
    feedbackHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    studentName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    feedbackClass: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
        marginRight: 5,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
    },
    feedbackText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 10,
    },
    feedbackFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    feedbackDate: {
        fontSize: 12,
        color: '#666',
    },
    feedbackSubject: {
        fontSize: 12,
        color: '#666',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    actionButton: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#fff',
        marginTop: 5,
    },
});