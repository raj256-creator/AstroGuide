import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../contexts/AuthContext';
import GradientBackground from '../../components/GradientBackground';
import { Star, Calendar, Palette, TrendingUp } from 'lucide-react-native';
import { zodiacSigns, dailyHoroscopes } from '../../data/horoscopes';

export default function HoroscopeScreen() {
  const { user } = useAuth();
  const [selectedSign, setSelectedSign] = useState(user?.zodiacSign || 'Aries');
  
  const horoscope = dailyHoroscopes.find(h => h.sign === selectedSign);
  const signInfo = zodiacSigns.find(s => s.name === selectedSign);

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Star size={48} color="#F59E0B" />
          <Text style={styles.title}>Daily Horoscope</Text>
          <Text style={styles.subtitle}>Your cosmic guidance for today</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.pickerCard}>
            <Text style={styles.pickerLabel}>Select Zodiac Sign</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={selectedSign}
                onValueChange={setSelectedSign}
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

          {signInfo && (
            <View style={styles.signCard}>
              <View style={styles.signHeader}>
                <Text style={styles.signSymbol}>{signInfo.symbol}</Text>
                <View style={styles.signInfo}>
                  <Text style={styles.signName}>{signInfo.name}</Text>
                  <Text style={styles.signDates}>{signInfo.dates}</Text>
                  <Text style={styles.signElement}>Element: {signInfo.element}</Text>
                </View>
              </View>
            </View>
          )}

          {horoscope && (
            <View style={styles.horoscopeCard}>
              <View style={styles.cardHeader}>
                <Calendar size={24} color="#F59E0B" />
                <Text style={styles.cardTitle}>Today's Reading</Text>
              </View>
              <Text style={styles.horoscopeText}>{horoscope.description}</Text>
              
              <View style={styles.detailsGrid}>
                <View style={styles.detailItem}>
                  <TrendingUp size={20} color="#6B46C1" />
                  <Text style={styles.detailLabel}>Lucky Number</Text>
                  <Text style={styles.detailValue}>{horoscope.luckyNumber}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Palette size={20} color="#6B46C1" />
                  <Text style={styles.detailLabel}>Lucky Color</Text>
                  <Text style={styles.detailValue}>{horoscope.luckyColor}</Text>
                </View>
              </View>

              <View style={styles.moodContainer}>
                <Text style={styles.moodLabel}>Today's Mood:</Text>
                <Text style={styles.moodValue}>{horoscope.mood}</Text>
              </View>
            </View>
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
  pickerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 12,
  },
  pickerWrapper: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#374151',
  },
  picker: {
    color: '#FFFFFF',
    height: 50,
  },
  signCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  signHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signSymbol: {
    fontSize: 48,
    marginRight: 16,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signDates: {
    fontSize: 14,
    color: '#F59E0B',
    marginTop: 4,
  },
  signElement: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 4,
  },
  horoscopeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 12,
  },
  horoscopeText: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
    marginBottom: 20,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    alignItems: 'center',
    flex: 0.48,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 8,
    textAlign: 'center',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 8,
  },
  moodLabel: {
    fontSize: 14,
    color: '#D1D5DB',
    marginRight: 8,
  },
  moodValue: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '600',
  },
});