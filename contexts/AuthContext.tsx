import React, { createContext, useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { User } from '../types/user';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string, dateOfBirth: string, zodiacSign: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Check for existing session
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate authentication with proper validation
      if (email && password.length >= 6) {
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          dateOfBirth: '1990-01-01',
          zodiacSign: 'Capricorn',
          createdAt: new Date().toISOString()
        };
        
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('user', JSON.stringify(mockUser));
        }
        setUser(mockUser);
        return true;
      }
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      return false;
    }
  };

  const signUp = async (
    name: string, 
    email: string, 
    password: string, 
    dateOfBirth: string, 
    zodiacSign: string
  ): Promise<boolean> => {
    try {
      // Validate input
      if (name && email && password.length >= 6 && dateOfBirth && zodiacSign) {
        const newUser: User = {
          id: Date.now().toString(),
          email,
          name,
          dateOfBirth,
          zodiacSign,
          createdAt: new Date().toISOString()
        };
        
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        setUser(newUser);
        return true;
      }
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('user');
      }
      setUser(null);
      router.replace('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}