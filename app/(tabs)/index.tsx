import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import GradientBackground from '../../components/GradientBackground';
import { Star, Sparkles, Moon, Sun } from 'lucide-react-native';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Star size={48} color="#F59E0B" />
          <Text style={styles.title}>Welcome to AstroGuide</Text>
          {user && (
            <Text style={styles.greeting}>Hello, {user.name}!</Text>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Sparkles size={24} color="#F59E0B" />
              <Text style={styles.cardTitle}>Your Cosmic Journey</Text>
            </View>
            <Text style={styles.cardText}>
              Explore the mysteries of the universe through personalized horoscopes and numerology readings.
            </Text>
          </View>

          {user && (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Star size={24} color="#6B46C1" />
                <Text style={styles.cardTitle}>Your Sign: {user.zodiacSign}</Text>
              </View>
              <Text style={styles.cardText}>
                Born on {new Date(user.dateOfBirth).toLocaleDateString()}, you carry the unique energy of {user.zodiacSign}.
              </Text>
            </View>
          )}

          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <Sun size={32} color="#F59E0B" />
              <Text style={styles.featureTitle}>Daily Horoscope</Text>
              <Text style={styles.featureText}>Get personalized daily insights</Text>
            </View>

            <View style={styles.featureCard}>
              <Moon size={32} color="#6B46C1" />
              <Text style={styles.featureTitle}>Numerology</Text>
              <Text style={styles.featureText}>Discover your life path numbers</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textAlign: 'center',
  },
  greeting: {
    fontSize: 18,
    color: '#F59E0B',
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#D1D5DB',
    lineHeight: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  featureCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.48,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 12,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 8,
    textAlign: 'center',
  },
});