import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import GradientBackground from '../components/GradientBackground';
import LoadingSpinner from '../components/LoadingSpinner';
import Button from '../components/Button';
import { Star, Sparkles } from 'lucide-react-native';

export default function WelcomeScreen() {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <LoadingSpinner />;
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Star size={64} color="#F59E0B" />
            <Sparkles size={32} color="#6B46C1" style={styles.sparkles} />
          </View>
          <Text style={styles.title}>AstroGuide</Text>
          <Text style={styles.subtitle}>
            Unlock the secrets of the cosmos and discover your true destiny
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Get Started"
            onPress={() => router.push('/auth/register')}
          />
          <View style={styles.spacing} />
          <Button
            title="I Have an Account"
            onPress={() => router.push('/auth/login')}
            variant="secondary"
          />
        </View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 32,
  },
  sparkles: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 26,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    paddingBottom: 16,
  },
  spacing: {
    height: 16,
  },
});