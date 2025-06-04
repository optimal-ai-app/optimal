import { useState, useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';

// Simple user type
interface User {
  id: string;
  email: string;
  name: string;
}

export function useAuth() {
  // State for user and loading
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Router for navigation
  const router = useRouter();
  const segments = useSegments();
  
  // Mock sign in function
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful sign in
      // In a real app, this would come from your auth provider
      setUser({
        id: '123',
        email,
        name: 'John Doe',
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to sign in. Please check your credentials.'
      };
    } finally {
      setLoading(false);
    }
  };
  
  // Mock sign up function
  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful sign up
      setUser({
        id: '123',
        email,
        name,
      });
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: 'Failed to create account. Please try again.'
      };
    } finally {
      setLoading(false);
    }
  };
  
  // Sign out function
  const signOut = async () => {
    setUser(null);
  };
  
  // Effect for auth state routing
  useEffect(() => {
    if (loading) return;
    
    const inAuthGroup = segments[0] === '(auth)';
    
    if (!user && !inAuthGroup) {
      // Redirect to sign in if not logged in and not in auth group
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if logged in and in auth group
      router.replace('/(tabs)');
    }
  }, [user, loading, segments]);
  
  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
}