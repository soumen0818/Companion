import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking } from "react-native";
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';


const colors = {
  primary: '#4A90E2',
  secondary: '#50C878',
  accent: '#FF6B6B',
  background: '#F0F2F5',
  cardGradientStart: '#FFFFFF',
  cardGradientEnd: '#F8F9FA',
  textPrimary: '#2C3E50',
  textSecondary: '#607D8B',
};

const menuItems = [
  { 
    title: 'Profile', 
    route: '/profile', 
    icon: 'person',
    color: '#4A90E2'
  },
  { 
    title: 'Attendance', 
    route: '/attendance', 
    icon: 'check-circle',
    color: '#50C878'
  },
  { 
    title: 'Fees', 
    route: '/fees', 
    icon: 'payment',
    color: '#FF6B6B'
  },
  { 
    title: 'Handbook', 
    route: '/handbook', 
    icon: 'book',
    color: '#FFB347'
  },
  { 
    title: 'Chatbot', 
    route: '/chatbot', 
    icon: 'chat',
    color: '#9B59B6'
  },
];

const NavBar = () => (
  <View style={styles.navBar}>
    <MaterialIcons name="school" size={32} color={colors.primary} style={styles.logo} />
    <Text style={styles.navTitle}>College Companion</Text>
  </View>
);

export default function Index() {
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.jiscollege.ac.in/')}>
                        <Image
                            source={require('../assets/college-logo.jpeg')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.appName}>College Companion</Text>
                        <Text style={styles.tagline}>Your Academic Assistant</Text>
                    </View>
                </View>
            </View>
            <View style={styles.gridContainer}>
                {menuItems.map((item) => (
                    <Link href={item.route} key={item.title} asChild>
                        <TouchableOpacity>
                            <View style={styles.card}>
                                <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                                    <MaterialIcons name={item.icon} size={32} color="#FFFFFF" />
                                </View>
                                <Text style={styles.cardText}>{item.title}</Text>
                                <MaterialIcons name="chevron-right" size={24} color={item.color} />
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        paddingTop: 40, // Reduced from 60
        paddingBottom: 15, // Reduced from 20
        borderBottomLeftRadius: 25, // Reduced from 30
        borderBottomRightRadius: 25, // Reduced from 30
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        marginBottom: 15, // Reduced from 20
    },
    logoContainer: {
        flexDirection: 'row', // Changed to row for horizontal layout
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
    },
    logo: {
        width: 60, // Reduced from 100
        height: 60, // Reduced from 100
        borderRadius: 30, // Adjusted for new size
        marginRight: 15, // Added margin for spacing from text
    },
    titleContainer: {
        flex: 1,
    },
    appName: {
        fontSize: 24, // Reduced from 28
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 2, // Reduced from 4
    },
    tagline: {
        fontSize: 14, // Reduced from 16
        color: colors.textSecondary,
    },
    gridContainer: {
        padding: 20,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.cardGradientStart,
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: colors.textPrimary,
    },
});


