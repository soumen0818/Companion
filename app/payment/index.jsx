import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const router = useRouter();

const feeDetails = [
    {
        id: 1,
        type: 'Tuition Fee',
        amount: 45000,
        dueDate: '2024-04-15',
        status: 'Pending'
    },
    {
        id: 2,
        type: 'Laboratory Fee',
        amount: 5000,
        dueDate: '2024-04-15',
        status: 'Pending'
    },
    {
        id: 3,
        type: 'Library Fee',
        amount: 2000,
        dueDate: '2024-04-15',
        status: 'Paid'
    }
];

const handlePayNow = () => {
    if (selectedPayment === 1) {
      router.push('/payment/credit-card');
      return;
    } else if (selectedPayment === 2) {
        const upiUrl = `upi://pay?pa=example@upi&pn=CompanionApp&am=${totalAmount}&cu=INR`;
        Linking.openURL(upiUrl).catch(() => alert('No UPI app found'));
    } else if (selectedPayment === 3) {
        alert('Redirecting to Net Banking');
        // Add logic to handle Net Banking payment
    } else {
        alert('Please select a payment method');
    }
};

  const paymentMethods = [
    {
      id: 1,
      name: 'Credit/Debit Card',
      icon: 'credit-card'
    },
    {
      id: 2,
      name: 'UPI',
      icon: 'account-balance'
    },
    {
      id: 3,
      name: 'Net Banking',
      icon: 'language'
    }
  ];

  const totalAmount = feeDetails
    .filter(fee => fee.status === 'Pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Fee Payment</Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <Text style={styles.totalAmount}>{formatAmount(totalAmount)}</Text>
          <Text style={styles.dueDate}>Due Date: {formatDate(feeDetails[0].dueDate)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fee Details</Text>
          {feeDetails.map((fee) => (
            <View key={fee.id} style={styles.feeItem}>
              <View>
                <Text style={styles.feeType}>{fee.type}</Text>
                <Text style={styles.feeDueDate}>Due: {formatDate(fee.dueDate)}</Text>
              </View>
              <View style={styles.feeRight}>
                <Text style={styles.feeAmount}>{formatAmount(fee.amount)}</Text>
                <View style={[styles.statusBadge, 
                  { backgroundColor: fee.status === 'Paid' ? '#4CAF50' : '#FFA726' }]}>
                  <Text style={styles.statusText}>{fee.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethod,
                selectedPayment === method.id && styles.selectedPayment
              ]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <MaterialIcons name={method.icon} size={24} color="#333" />
              <Text style={styles.paymentMethodText}>{method.name}</Text>
              <MaterialIcons
                name={selectedPayment === method.id ? 'radio-button-checked' : 'radio-button-unchecked'}
                size={24}
                color="#27AE60"
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 60,
  },
  header: {
    backgroundColor: '#27AE60',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#27AE60',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 8,
  },
  dueDate: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  feeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  feeType: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  feeDueDate: {
    fontSize: 12,
    color: '#666',
  },
  feeRight: {
    alignItems: 'flex-end',
  },
  feeAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedPayment: {
    borderColor: '#27AE60',
    backgroundColor: '#f0fff4',
  },
  paymentMethodText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  payButton: {
    backgroundColor: '#27AE60',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }
});