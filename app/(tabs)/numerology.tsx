import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Calculator, Hash, Star } from 'lucide-react-native';
import { calculateLifePathNumber, calculateDestinyNumber } from '../../utils/numerologyCalculator';
import { numerologyInterpretations } from '../../data/numerology';
import { NumerologyResult } from '../../types/numerology';

export default function NumerologyScreen() {
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [result, setResult] = useState<NumerologyResult | null>(null);
  const [loading, setLoading] = useState(false);

  const calculateNumbers = () => {
    if (!fullName || !dateOfBirth) {
      Alert.alert('Error', 'Please enter both your full name and date of birth');
      return;
    }

    setLoading(true);
    
    try {
      const lifePathNumber = calculateLifePathNumber(dateOfBirth);
      const destinyNumber = calculateDestinyNumber(fullName);
      
      const lifePathInterp = numerologyInterpretations.find(n => n.number === lifePathNumber);
      const destinyInterp = numerologyInterpretations.find(n => n.number === destinyNumber);
      
      setResult({
        lifePathNumber,
        destinyNumber,
        lifePathInterpretation: lifePathInterp?.lifePathMeaning || 'No interpretation available',
        destinyInterpretation: destinyInterp?.destinyMeaning || 'No interpretation available',
      });
    } catch (error) {
      Alert.alert('Error', 'Invalid date format. Please use YYYY-MM-DD');
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Calculator size={48} color="#F59E0B" />
          <Text style={styles.title}>Numerology Calculator</Text>
          <Text style={styles.subtitle}>Discover your life path and destiny numbers</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.inputCard}>
            <Input
              label="Full Name"
              value={fullName}
              onChangeText={setFullName}
              placeholder="Enter your complete name"
            />
            
            <Input
              label="Date of Birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              placeholder="YYYY-MM-DD"
            />

            <Button
              title="Calculate Numbers"
              onPress={calculateNumbers}
              loading={loading}
            />
          </View>

          {result && (
            <>
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Hash size={24} color="#F59E0B" />
                  <Text style={styles.resultTitle}>Life Path Number</Text>
                </View>
                <Text style={styles.numberValue}>{result.lifePathNumber}</Text>
                <Text style={styles.interpretation}>{result.lifePathInterpretation}</Text>
              </View>

              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Star size={24} color="#6B46C1" />
                  <Text style={styles.resultTitle}>Destiny Number</Text>
                </View>
                <Text style={styles.numberValue}>{result.destinyNumber}</Text>
                <Text style={styles.interpretation}>{result.destinyInterpretation}</Text>
              </View>
            </>
          )}
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
  subtitle: {
    fontSize: 16,
    color: '#D1D5DB',
    marginTop: 8,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  inputCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  resultCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    marginBottom: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  numberValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#F59E0B',
    textAlign: 'center',
    marginBottom: 16,
  },
  interpretation: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
    textAlign: 'center',
  },
});