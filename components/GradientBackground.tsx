import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

interface GradientBackgroundProps {
  children: React.ReactNode;
}

export default function GradientBackground({ children }: GradientBackgroundProps) {
  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A40', '#2D1B69']}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});