import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    ScrollView,
    Linking 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ContactsModal({ visible, onClose }) {
    const teachers = [
        {
            name: 'Dr. Amit Kumar',
            subject: 'Data Structures',
            designation: 'Associate Professor',
            phone: '+91 9876543210',
            email: 'amit.kumar@college.edu',
            available: '10:00 AM - 4:00 PM'
        },
        {
            name: 'Prof. Priya Singh',
            subject: 'Database Management',
            designation: 'Assistant Professor',
            phone: '+91 9876543211',
            email: 'priya.singh@college.edu',
            available: '9:00 AM - 3:00 PM'
        },
        {
            name: 'Dr. Rajesh Verma',
            subject: 'Computer Networks',
            designation: 'Professor',
            phone: '+91 9876543212',
            email: 'rajesh.verma@college.edu',
            available: '11:00 AM - 5:00 PM'
        }
    ];

    const handleCall = (phone) => {
        Linking.openURL(`tel:${phone}`);
    };

    const handleEmail = (email) => {
        Linking.openURL(`mailto:${email}`);
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
                        <Text style={styles.modalTitle}>Faculty Contacts</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.contactsList}>
                        {teachers.map((teacher, index) => (
                            <View key={index} style={styles.contactCard}>
                                <View style={styles.contactHeader}>
                                    <Text style={styles.teacherName}>{teacher.name}</Text>
                                    <Text style={styles.designation}>{teacher.designation}</Text>
                                </View>
                                
                                <Text style={styles.subject}>{teacher.subject}</Text>
                                
                                <View style={styles.contactActions}>
                                    <TouchableOpacity 
                                        style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                                        onPress={() => handleCall(teacher.phone)}
                                    >
                                        <MaterialIcons name="phone" size={20} color="#fff" />
                                        <Text style={styles.actionText}>Call</Text>
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity 
                                        style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
                                        onPress={() => handleEmail(teacher.email)}
                                    >
                                        <MaterialIcons name="email" size={20} color="#fff" />
                                        <Text style={styles.actionText}>Email</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.availabilityContainer}>
                                    <MaterialIcons name="access-time" size={16} color="#666" />
                                    <Text style={styles.availabilityText}>
                                        Available: {teacher.available}
                                    </Text>
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
    contactsList: {
        padding: 15,
    },
    contactCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    contactHeader: {
        marginBottom: 8,
    },
    teacherName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    designation: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    subject: {
        fontSize: 15,
        color: '#4A90E2',
        marginBottom: 12,
    },
    contactActions: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginRight: 10,
    },
    actionText: {
        color: '#fff',
        marginLeft: 5,
        fontSize: 14,
        fontWeight: '500',
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        marginLeft: 5,
        fontSize: 13,
        color: '#666',
    }
});