import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FeesScreen() {
  const feesData = {
    totalFees: 50000,
    paid: 30000,
    pending: 20000,
    transactions: [
      { id: 1, date: '2024-03-15', amount: 15000, status: 'Paid' },
      { id: 2, date: '2024-02-15', amount: 15000, status: 'Paid' },
      { id: 3, date: '2024-04-15', amount: 20000, status: 'Pending' },
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fees Overview</Text>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Total Fees</Text>
            <Text style={styles.summaryValue}>₹{feesData.totalFees}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Paid</Text>
            <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
              ₹{feesData.paid}
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pending</Text>
            <Text style={[styles.summaryValue, { color: '#FF9800' }]}>
              ₹{feesData.pending}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionsContainer}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {feesData.transactions.map((transaction) => (
          <View key={transaction.id} style={styles.transactionCard}>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDate}>{transaction.date}</Text>
              <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text
                style={[
                  styles.statusText,
                  { color: transaction.status === 'Paid' ? '#4CAF50' : '#FF9800' }
                ]}
              >
                {transaction.status}
              </Text>
              <MaterialIcons
                name={transaction.status === 'Paid' ? 'check-circle' : 'pending'}
                size={20}
                color={transaction.status === 'Paid' ? '#4CAF50' : '#FF9800'}
              />
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#007AFF',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  summaryContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 5,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  transactionCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDate: {
    color: '#666',
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    marginRight: 5,
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});