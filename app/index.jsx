import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, Linking, ScrollView } from "react-native";
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Redirect } from 'expo-router';
import { useAuth } from '../context/auth';
import BottomNav from '../components/BottomNav';

export function RedirectToLogin() {
    return <Redirect href="/login" />;
}

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
        title: 'Events', 
        route: '/events', 
        icon: 'event',
        color: '#E74C3C'
    },
    { 
        title: 'Notices', 
        route: '/notices', 
        icon: 'announcement',
        color: '#F39C12'
    },
    { 
        title: 'Attendance', 
        route: '/attendance', 
        icon: 'check-circle',
        color: '#50C878'
    },
    { 
        title: 'Online Payment', 
        route: '/payment', 
        icon: 'account-balance-wallet',
        color: '#27AE60'
    },
    { 
        title: 'Fees', 
        route: '/fees', 
        icon: 'payment',
        color: '#FF6B6B'
    },
    { 
        title: 'Placement', 
        route: '/placement', 
        icon: 'business-center',
        color: '#3498DB'
    },
    { 
        title: 'MAR Points', 
        route: '/mar-points', 
        icon: 'stars',
        color: '#9B59B6'
    },
    { 
        title: 'Feedback', 
        route: '/feedback', 
        icon: 'feedback',
        color: '#1ABC9C'
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
        color: '#8E44AD'
    },
];

const NavBar = () => (
  <View style={styles.navBar}>
    <MaterialIcons name="school" size={32} color={colors.primary} style={styles.logo} />
    <Text style={styles.navTitle}>College Companion</Text>
  </View>
);


export default function Index() {
    const { user } = useAuth();

    if (!user) {
        return <RedirectToLogin />;
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <ScrollView 
                showsVerticalScrollIndicator={false} 
                bounces={true}
                contentContainerStyle={{ flexGrow: 1 }}
                contentInsetAdjustmentBehavior="automatic"
            >
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
            </ScrollView>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingBottom: 60, // Add padding for bottom navigation
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
        paddingBottom: 80, // Add extra padding at the bottom
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
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        elevation: 8,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: colors.primary,
    },
});

