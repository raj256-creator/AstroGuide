import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import GradientBackground from '../../components/GradientBackground';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Star } from 'lucide-react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const success = await signIn(email, password);
    setLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Star size={48} color="#F59E0B" />
          <Text style={styles.title}>AstroGuide</Text>
          <Text style={styles.subtitle}>Welcome back to your cosmic journey</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Link href="/auth/register" style={styles.link}>
                Sign up here
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 8,
    textAlign: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    backdropFilter: 'blur(10px)',
  },
  footer: {
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#D1D5DB',
    fontSize: 14,
  },
  link: {
    color: '#F59E0B',
    fontWeight: '600',
  },
});