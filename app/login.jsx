import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/auth';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [selectedRole, setSelectedRole] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { id: 'teacher', title: 'Teacher', icon: 'school' },
    { id: 'student', title: 'Student', icon: 'person' },
    { id: 'parent', title: 'Parent', icon: 'people' }
  ];

  const handleLogin = () => {
    if (username && password) {
      // Sign in the user with their role
      signIn({ 
        username, 
        role: selectedRole,
        // Add any other user data you need
      });
      
      // Navigate based on role
      switch(selectedRole) {
        case 'teacher':
          router.replace('/teacher');
          break;
        case 'parent':
          router.replace('/parent');
          break;
        case 'student':
          router.replace('/');
          break;
        default:
          alert('Invalid role selected');
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../assets/college-logo.jpeg')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>College Companion</Text>
        <Text style={styles.subtitle}>Login to continue</Text>

        <View style={styles.roleContainer}>
          {roles.map(role => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleButton,
                selectedRole === role.id && styles.selectedRole
              ]}
              onPress={() => setSelectedRole(role.id)}
            >
              <MaterialIcons 
                name={role.icon} 
                size={24} 
                color={selectedRole === role.id ? '#fff' : '#666'} 
              />
              <Text style={[
                styles.roleText,
                selectedRole === role.id && styles.selectedRoleText
              ]}>
                {role.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Username or ID"
            value={username}
            onChangeText={setUsername}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="lock-outline" size={24} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons 
              name={showPassword ? 'visibility' : 'visibility-off'} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.loginButton,
            (!selectedRole || !username || !password) && styles.loginButtonDisabled
          ]}
          onPress={handleLogin}
          disabled={!selectedRole || !username || !password}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  roleButton: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  selectedRole: {
    backgroundColor: '#007AFF',
  },
  roleText: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
  selectedRoleText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#007AFF',
    fontSize: 14,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});