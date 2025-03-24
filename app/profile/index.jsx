import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    ScrollView, 
    Platform, 
    KeyboardAvoidingView 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Profile = () => {
    const studentInfo = {
        name: 'John Doe',
        rollNumber: '21CS123',
        branch: 'Computer Science',
        semester: '4th Semester',
        email: 'john.doe@example.com',
        phone: '+91 9876543210',
        attendance: '85%',
        cgpa: '8.5'
    };

    const InfoRow = ({ icon, label, value }) => (
        <View style={styles.infoRow}>
            <MaterialIcons name={icon} size={24} color="#007AFF" />
            <View style={styles.infoContent}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 60}
        >
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Image
                        style={styles.profileImage}
                        source={{ uri: 'https://ui-avatars.com/api/?name=John+Doe&background=007AFF&color=fff' }}
                        onError={() => {}}
                    />
                    <Text style={styles.name}>{studentInfo.name}</Text>
                    <Text style={styles.rollNumber}>{studentInfo.rollNumber}</Text>
                </View>
                <View style={styles.infoSection}>
                    <InfoRow icon="school" label="Branch" value={studentInfo.branch} />
                    <InfoRow icon="calendar-today" label="Semester" value={studentInfo.semester} />
                    <InfoRow icon="email" label="Email" value={studentInfo.email} />
                    <InfoRow icon="phone" label="Phone" value={studentInfo.phone} />
                    <InfoRow icon="check-circle" label="Attendance" value={studentInfo.attendance} />
                    <InfoRow icon="grade" label="CGPA" value={studentInfo.cgpa} />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        paddingBottom: Platform.OS === 'ios' ? 120 : 90, // Increased padding
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
        borderWidth: 3,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    rollNumber: {
        fontSize: 16,
        color: '#666',
    },
    infoSection: {
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 50 : 30, // Added padding bottom
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    infoContent: {
        marginLeft: 12,
        flex: 1,
    },
    label: {
        fontSize: 14,
        color: '#666',
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginTop: 4,
    },
});

export default Profile;