import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Mail, Lock, User } from 'lucide-react-native';
import Animated, { 
  FadeInDown, 
  FadeInUp 
} from 'react-native-reanimated';

import { Card } from '@/src/components/Card';
import { InputField } from '@/src/components/InputField';
import { Button } from '@/src/components/Button';
import { useAuthContext } from '@/src/context/AuthContext';
import { colors } from '@/src/constants/colors';
import { fonts } from '@/src/constants/fonts';

export default function SignUpScreen() {
  // State for form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Auth context
  const { signUp } = useAuthContext();
  
  // Handle sign up
  const handleSignUp = async () => {
    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    try {
      const result = await signUp(email, password, name);
      
      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Animated.View 
        style={styles.logoContainer}
        entering={FadeInDown.duration(1000).delay(200)}
      >
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          style={styles.logoBackground}
        >
          <Text style={styles.logoText}>AI</Text>
        </LinearGradient>
        <Text style={styles.appName}>Accountability AI</Text>
      </Animated.View>
      
      <Animated.View
        entering={FadeInUp.duration(1000).delay(400)}
        style={styles.formContainer}
      >
        <Card elevated padded style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Start your productivity journey</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          <InputField
            label="Full Name"
            value={name}
            onChangeText={setName}
            icon={<User size={20} color={colors.text.muted} />}
          />
          
          <InputField
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon={<Mail size={20} color={colors.text.muted} />}
          />
          
          <InputField
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            icon={<Lock size={20} color={colors.text.muted} />}
          />
          
          <InputField
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            icon={<Lock size={20} color={colors.text.muted} />}
          />
          
          <Button 
            title="Sign Up" 
            onPress={handleSignUp}
            isLoading={isLoading}
            fullWidth
            style={styles.signUpButton}
          />
          
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <Link href="/(auth)/login" asChild>
              <TouchableOpacity>
                <Text style={styles.signInLink}>Sign In</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </Card>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  
  logoBackground: {
    width: 80,
    height: 80,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logoText: {
    fontSize: 36,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  appName: {
    marginTop: 12,
    fontSize: fonts.sizes.xl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
  },
  
  formContainer: {
    width: '100%',
    maxWidth: 400,
  },
  
  card: {
    backgroundColor: colors.background.card,
  },
  
  title: {
    fontSize: fonts.sizes.xxl,
    fontWeight: fonts.weights.bold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  
  subtitle: {
    fontSize: fonts.sizes.md,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  
  errorContainer: {
    backgroundColor: 'rgba(255, 77, 77, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  
  errorText: {
    color: colors.status.error,
    fontSize: fonts.sizes.sm,
    textAlign: 'center',
  },
  
  signUpButton: {
    marginTop: 8,
  },
  
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  
  signInText: {
    color: colors.text.secondary,
    fontSize: fonts.sizes.sm,
  },
  
  signInLink: {
    color: colors.button.primary,
    fontSize: fonts.sizes.sm,
    fontWeight: fonts.weights.medium,
  },
});