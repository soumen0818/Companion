import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity,
    Platform,
    Image,
    Dimensions 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AttendanceModal from './components/AttendanceModal';
// eslint-disable-next-line no-unused-vars
import StudentReports from './components/Studentfeedback';
import { useRouter } from "expo-router";
import { LinearGradient } from 'expo-linear-gradient';
import { useFeedback } from '../../context/FeedbackContext';

const { width } = Dimensions.get('window');
const cardWidth = width - 5; // Full width minus padding

export default function TeacherDashboard() {
    const router = useRouter();
    const { setFeedbackData } = useFeedback();
    
    // Add this to handle logout
    const handleLogout = () => {
        // Add logout logic here
        router.replace("/login");
    };

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showAttendance, setShowAttendance] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);

    const teacherInfo = {
        name: "Dr. Tejas Edwards",
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
            comment: "Excellent teaching methodology.",
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

    const handleStudentReports = () => {
        try {
            setFeedbackData(studentFeedback);
            router.push("/teacher/components/Studentfeedback");
        } catch (error) {
            console.error("Error navigating to student reports:", error);
        }
    };

    const quickActions = [
        {
            title: 'Take Attendance',
            icon: 'how-to-reg',
            color: '#4CAF50',
            backgroundColor: '#E8F5E9',
            onPress: () => setShowAttendance(true)
        },
        {
            title: 'Upload Notes',
            icon: 'upload-file',
            color: '#2196F3',
            backgroundColor: '#E3F2FD',
            onPress: () => router.push('/teacher/notes')
        },
        {
            title: 'Assignments',
            icon: 'assignment',
            color: '#FFC107',
            backgroundColor: '#FFF8E1',
            onPress: () => router.push('/teacher/assignments')
        },
        {
            title: 'Student Reports',
            icon: 'analytics',
            color: '#9C27B0',
            backgroundColor: '#F3E5F5',
            onPress: handleStudentReports
        }
    ];

    const statsCards = [
        {
            title: 'Students',
            count: '156',
            icon: 'people',
            color: '#4CAF50',
            backgroundColor: '#E8F5E9'
        },
        {
            title: 'Classes',
            count: '4',
            icon: 'class',
            color: '#2196F3',
            backgroundColor: '#E3F2FD'
        },
        {
            title: 'Assignments',
            count: '12',
            icon: 'assignment',
            color: '#FF9800',
            backgroundColor: '#FFF3E0'
        }
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <LinearGradient
                colors={['#1a237e', '#283593']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View style={styles.profileInfo}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=Teacher&background=ffffff&color=1a237e&bold=true' }}
                            style={styles.avatar}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{teacherInfo.name}</Text>
                            <Text style={styles.role}>{teacherInfo.designation}</Text>
                            <View style={styles.departmentBadge}>
                                <MaterialIcons name="school" size={16} color="#fff" />
                                <Text style={styles.departmentText}>{teacherInfo.department}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {/* Quick Stats */}
                <View style={styles.statsGrid}>
                    {statsCards.map((stat, index) => (
                        <View 
                            key={index} 
                            style={[styles.statsCard, { backgroundColor: stat.backgroundColor }]}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: stat.color }]}>
                                <MaterialIcons name={stat.icon} size={24} color="#fff" />
                            </View>
                            <Text style={styles.statsCount}>{stat.count}</Text>
                            <Text style={styles.statsTitle}>{stat.title}</Text>
                        </View>
                    ))}
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActions}>
                    {quickActions.map((action, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.actionCard, { backgroundColor: action.backgroundColor }]}
                            onPress={action.onPress}
                        >
                            <View style={[styles.iconCircle, { backgroundColor: action.color }]}>
                                <MaterialIcons name={action.icon} size={24} color="#fff" />
                            </View>
                            <Text style={styles.actionText}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Today's Schedule */}
                <View style={styles.scheduleSection}>
                    <Text style={styles.sectionTitle}>Today's Schedule</Text>
                    {todayClasses.map((classInfo, index) => (
                        <View key={index} style={styles.scheduleCard}>
                            <View style={styles.timeContainer}>
                                <Text style={styles.timeText}>{classInfo.time.split(' - ')[0]}</Text>
                                <Text style={styles.timePeriod}>{classInfo.time.split(' ')[1]}</Text>
                            </View>
                            <View style={styles.classDetails}>
                                <Text style={styles.subjectName}>{classInfo.subject}</Text>
                                <Text style={styles.className}>{classInfo.class}</Text>
                                <View style={styles.detailRow}>
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
                                <MaterialIcons name="edit" size={20} color="#1a237e" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
                {/* Student Feedback Section */}
                <View style={styles.scheduleSection}>
                    <Text style={styles.sectionTitle}>Recent Student Feedback</Text>
                    {studentFeedback.map((feedback, index) => (
                        <View key={index} style={styles.scheduleCard}>
                            <View style={styles.classDetails}>
                                <Text style={styles.subjectName}>{feedback.student}</Text>
                                <Text style={styles.className}>{feedback.subject}</Text>
                                <View style={styles.detailRow}>
                                    <View style={styles.detailItem}>
                                        {renderStars(feedback.rating)}
                                    </View>
                                </View>
                                <Text style={styles.detailText}>{feedback.comment}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>

            <AttendanceModal 
                visible={showAttendance}
                onClose={() => setShowAttendance(false)}
                classInfo={selectedClass}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    header: {
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        paddingBottom: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerContent: {
        paddingHorizontal: 20,
    },
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff',
    },
    textContainer: {
        marginLeft: 15,
        flex: 1,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 4,
    },
    role: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
    },
    departmentBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    departmentText: {
        color: '#fff',
        marginLeft: 6,
        fontSize: 14,
    },
    content: {
        padding: 20,
    },
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -30,
    },
    statsCard: {
        width: (cardWidth - 32) / 3, // Divide available space by 3 for equal width cards
        aspectRatio: 0.9, // Makes cards slightly taller than wide
        borderRadius: 16,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    statsCount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 4,
    },
    statsTitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 15,
        marginTop: 20,
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    actionCard: {
        width: '48%',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    iconCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    actionText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1a237e',
    },
    scheduleSection: {
        marginTop: 20,
    },
    scheduleCard: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    timeContainer: {
        width: 80,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#eee',
        paddingRight: 15,
    },
    timeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a237e',
    },
    timePeriod: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    classDetails: {
        flex: 1,
        paddingLeft: 15,
    },
    subjectName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 4,
    },
    className: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    detailText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
    attendanceButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#E3F2FD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expertiseBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    expertiseText: {
        color: '#fff',
        marginLeft: 6,
        fontSize: 14,
    },
});