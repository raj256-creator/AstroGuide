import React, { createContext, useContext, useEffect, useState } from 'react';
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
      // For demo purposes, check localStorage for user session
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, simulate authentication
      // In a real app, this would call Supabase auth
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        dateOfBirth: '1990-01-01',
        zodiacSign: 'Capricorn',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
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
      // For demo purposes, simulate registration
      // In a real app, this would call Supabase auth and insert user profile
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        dateOfBirth,
        zodiacSign,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
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