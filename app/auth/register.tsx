import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/AuthContext';
import GradientBackground from '../../components/GradientBackground';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Star } from 'lucide-react-native';
import { zodiacSigns } from '../../data/horoscopes';
import { getZodiacFromDate } from '../../utils/numerologyCalculator';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [zodiacSign, setZodiacSign] = useState('Aries');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleDateChange = (date: string) => {
    setDateOfBirth(date);
    if (date) {
      const calculatedSign = getZodiacFromDate(date);
      setZodiacSign(calculatedSign);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !dateOfBirth) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const success = await signUp(name, email, password, dateOfBirth, zodiacSign);
    setLoading(false);

    if (success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.header}>
          <Star size={48} color="#F59E0B" />
          <Text style={styles.title}>Join AstroGuide</Text>
          <Text style={styles.subtitle}>Discover your cosmic destiny</Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
          />
          
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
            placeholder="Create a password"
            secureTextEntry
          />

          <Input
            label="Date of Birth"
            value={dateOfBirth}
            onChangeText={handleDateChange}
            placeholder="YYYY-MM-DD"
          />

          <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Zodiac Sign</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={zodiacSign}
                onValueChange={setZodiacSign}
                style={styles.picker}
              >
                {zodiacSigns.map((sign) => (
                  <Picker.Item 
                    key={sign.name} 
                    label={`${sign.symbol} ${sign.name}`} 
                    value={sign.name}
                    color="#FFFFFF"
                  />
                ))}
              </Picker>
            </View>
          </View>

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Link href="/auth/login" style={styles.link}>
                Sign in here
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
    marginBottom: 32,
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
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  pickerWrapper: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
  },
  picker: {
    color: '#FFFFFF',
    height: 50,
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