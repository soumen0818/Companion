import { Stack } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import BottomNav from '../components/BottomNav';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { AuthProvider, useAuth } from '../context/auth';

// Export RootLayoutNav so it can be used elsewhere
export function RootLayoutNav() {
  const { user } = useAuth();

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
          headerShown: true, // Show header by default
        }}
      >
        {!user ? (
          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
            }}
          />
        ) : user.role === 'student' ? (
          <>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
                gestureEnabled: false,
                headerLeft: () => null,
              }}
            />
            {/* ...other screen configurations... */}
          </>
        ) : user.role === 'teacher' ? (
          <Stack.Screen
            name="teacher"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        ) : (
          <Stack.Screen
            name="parent"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          />
        )}
      </Stack>
      {/* Only show BottomNav when user exists and path is not login */}
      {user && user.role === 'student' && (
        <View style={styles.bottomNavContainer}>
          <BottomNav />
        </View>
      )}
    </View>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});