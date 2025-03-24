import { Stack } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import BottomNav from '../components/BottomNav';

export default function Layout() {
    return (
        <View style={styles.container}>
            <Stack 
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#fff',
                        height: Platform.OS === 'ios' ? 110 : 70,
                    },
                    headerTintColor: '#007AFF',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    animation: 'slide_from_right',
                }}
            >
                <Stack.Screen 
                    name="index" 
                    options={{ 
                        title: 'College Companion',
                        headerShown: false 
                    }} 
                />
                <Stack.Screen 
                    name="attendance" 
                    options={{ 
                        title: 'Attendance',
                        headerShown: true,
                        headerBackTitle: 'Back'
                    }} 
                />
                <Stack.Screen 
                    name="profile" 
                    options={{ 
                        title: 'Profile',
                        headerShown: true,
                        headerBackTitle: 'Back'
                    }} 
                />
                <Stack.Screen 
                    name="fees" 
                    options={{ 
                        title: 'Fees',
                        headerShown: true,
                        headerBackTitle: 'Back'
                    }} 
                />
                <Stack.Screen 
                    name="handbook" 
                    options={{ 
                        title: 'Handbook',
                        headerShown: true,
                        headerBackTitle: 'Back'
                    }} 
                />
                <Stack.Screen 
                    name="chatbot" 
                    options={{ 
                        title: 'Chatbot',
                        headerShown: true,
                        headerBackTitle: 'Back'
                    }} 
                />
            </Stack>
            <BottomNav />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});