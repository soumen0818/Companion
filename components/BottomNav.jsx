import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Keyboard, Platform } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';

const BottomNav = () => {
    const pathname = usePathname();
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            () => setKeyboardVisible(true)
        );
        const keyboardWillHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => setKeyboardVisible(false)
        );

        return () => {
            keyboardWillShowListener.remove();
            keyboardWillHideListener.remove();
        };
    }, []);

    if (isKeyboardVisible) {
        return null;
    }

    const routes = [
        { name: 'Home', icon: 'home', path: '/' },
        { name: 'Attendance', icon: 'check-circle', path: '/attendance' },
        { name: 'Profile', icon: 'person', path: '/profile' }
    ];

    return (
        <View style={styles.container}>
            {routes.map((route) => (
                <Link key={route.path} href={route.path} asChild>
                    <TouchableOpacity
                        style={styles.navItem}
                    >
                        <MaterialIcons 
                            name={route.icon} 
                            size={24} 
                            color={pathname === route.path ? '#007AFF' : '#666'} 
                        />
                        <Text style={[
                            styles.navText,
                            pathname === route.path && styles.activeText
                        ]}>
                            {route.name}
                        </Text>
                    </TouchableOpacity>
                </Link>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    navItem: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#666',
        marginTop: 4,
    },
    activeText: {
        color: '#007AFF',
    }
});

export default BottomNav;