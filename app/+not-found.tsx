import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import GradientBackground from '../components/GradientBackground';
import Button from '../components/Button';
import { AlertTriangle } from 'lucide-react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <GradientBackground>
        <View style={styles.container}>
          <AlertTriangle size={64} color="#F59E0B" />
          <Text style={styles.title}>Page Not Found</Text>
          <Text style={styles.text}>The page you're looking for doesn't exist.</Text>
          <Button title="Go to Home" onPress={() => router.push('/')} />
        </View>
      </GradientBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 32,
  },
});