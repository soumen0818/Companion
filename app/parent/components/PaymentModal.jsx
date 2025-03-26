import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Modal, 
    TouchableOpacity, 
    ScrollView,
    TextInput,
    Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PaymentModal({ visible, onClose, amount }) {
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [upiId, setUpiId] = useState('');

    const paymentMethods = [
        { id: 'card', title: 'Credit/Debit Card', icon: 'credit-card' },
        { id: 'upi', title: 'UPI Payment', icon: 'account-balance' },
        { id: 'netbanking', title: 'Net Banking', icon: 'account-balance-wallet' }
    ];

    const handlePayment = () => {
        // Add your payment processing logic here
        Alert.alert(
            "Payment Successful",
            "Your payment has been processed successfully.",
            [{ text: "OK", onPress: onClose }]
        );
    };

    const renderPaymentForm = () => {
        switch(paymentMethod) {
            case 'card':
                return (
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Card Number"
                            value={cardNumber}
                            onChangeText={setCardNumber}
                            keyboardType="numeric"
                            maxLength={16}
                        />
                        <View style={styles.rowInputs}>
                            <TextInput
                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChangeText={setExpiryDate}
                                maxLength={5}
                            />
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="CVV"
                                value={cvv}
                                onChangeText={setCvv}
                                keyboardType="numeric"
                                maxLength={3}
                                secureTextEntry
                            />
                        </View>
                    </View>
                );
            case 'upi':
                return (
                    <View style={styles.formContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter UPI ID (example@upi)"
                            value={upiId}
                            onChangeText={setUpiId}
                            autoCapitalize="none"
                        />
                    </View>
                );
            case 'netbanking':
                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.bankingText}>
                            You will be redirected to your bank's website to complete the payment.
                        </Text>
                    </View>
                );
            default:
                return null;
        }
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
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <MaterialIcons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Fee Payment</Text>
                    </View>

                    <ScrollView style={styles.content}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountLabel}>Amount to Pay</Text>
                            <Text style={styles.amount}>{amount}</Text>
                        </View>

                        <Text style={styles.sectionTitle}>Select Payment Method</Text>
                        <View style={styles.methodsContainer}>
                            {paymentMethods.map(method => (
                                <TouchableOpacity
                                    key={method.id}
                                    style={[
                                        styles.methodCard,
                                        paymentMethod === method.id && styles.selectedMethod
                                    ]}
                                    onPress={() => setPaymentMethod(method.id)}
                                >
                                    <MaterialIcons 
                                        name={method.icon} 
                                        size={24} 
                                        color={paymentMethod === method.id ? '#fff' : '#666'} 
                                    />
                                    <Text style={[
                                        styles.methodText,
                                        paymentMethod === method.id && styles.selectedMethodText
                                    ]}>
                                        {method.title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {renderPaymentForm()}

                        {paymentMethod && (
                            <TouchableOpacity 
                                style={styles.payButton}
                                onPress={handlePayment}
                            >
                                <Text style={styles.payButtonText}>Pay Now</Text>
                            </TouchableOpacity>
                        )}
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
        maxHeight: '90%',
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    content: {
        padding: 20,
    },
    amountContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    amountLabel: {
        fontSize: 16,
        color: '#666',
    },
    amount: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    methodsContainer: {
        marginBottom: 20,
    },
    methodCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f9fa',
        borderRadius: 12,
        marginBottom: 10,
    },
    selectedMethod: {
        backgroundColor: '#4A90E2',
    },
    methodText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    selectedMethodText: {
        color: '#fff',
    },
    formContainer: {
        marginTop: 20,
    },
    input: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        fontSize: 16,
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    bankingText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    payButton: {
        backgroundColor: '#27AE60',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});