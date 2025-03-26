import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFeedback } from '../../../context/FeedbackContext';

export default function Studentfeedback() {
    const router = useRouter();
    const { feedbackData } = useFeedback();

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
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Student Feedback</Text>
            </View>

            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {feedbackData?.map((feedback, index) => (
                    <View key={index} style={styles.feedbackCard}>
                        <View style={styles.cardHeader}>
                            <View style={styles.studentInfo}>
                                <Text style={styles.studentName}>{feedback.student}</Text>
                                <Text style={styles.className}>{feedback.class}</Text>
                            </View>
                            <View style={styles.ratingContainer}>
                                {renderStars(feedback.rating)}
                                <Text style={styles.ratingText}>{feedback.rating}</Text>
                            </View>
                        </View>
                        <Text style={styles.subjectText}>{feedback.subject}</Text>
                        <Text style={styles.feedbackText}>{feedback.comment}</Text>
                        <Text style={styles.dateText}>{feedback.date}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    header: {
        backgroundColor: '#1a237e',
        padding: 20,
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        padding: 16,
    },
    feedbackCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    studentInfo: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    rollNo: {
        fontSize: 14,
        color: '#666',
    },
    ratingContainer: {
        alignItems: 'center',
    },
    stars: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    ratingText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    subjectContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        backgroundColor: '#E3F2FD',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    subjectText: {
        marginLeft: 8,
        color: '#4A90E2',
        fontWeight: '500',
    },
    feedbackText: {
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        marginBottom: 12,
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
});