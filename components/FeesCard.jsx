import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Fees() {
    const feesData = [
        { semester: 'Semester 1', amount: 45000, status: 'Paid' },
        { semester: 'Semester 2', amount: 45000, status: 'Pending' },
    ];

    return (
        <ScrollView style={styles.container}>
            {feesData.map((item, index) => (
                <View key={index} style={styles.card}>
                    <Text style={styles.semester}>{item.semester}</Text>
                    <Text style={styles.amount}>₹{item.amount}</Text>
                    <Text style={[
                        styles.status,
                        { color: item.status === 'Paid' ? '#4CAF50' : '#FF9800' }
                    ]}>
                        {item.status}
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    card: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        elevation: 2,
    },
    semester: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    amount: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
    },
    status: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 8,
    },
});