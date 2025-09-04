import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import GradientBackground from '../../components/GradientBackground';
import Button from '../../components/Button';
import { User, Calendar, Star, Mail, LogOut } from 'lucide-react-native';
import { zodiacSigns } from '../../data/horoscopes';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: signOut
        },
      ]
    );
  };

  const userSign = zodiacSigns.find(sign => sign.name === user?.zodiacSign);

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <User size={48} color="#F59E0B" />
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.subtitle}>Your cosmic identity</Text>
        </View>

        {user && (
          <View style={styles.content}>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
                <Text style={styles.nameText}>{user.name}</Text>
              </View>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoItem}>
                <Mail size={20} color="#6B46C1" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{user.email}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Calendar size={20} color="#6B46C1" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Date of Birth</Text>
                  <Text style={styles.infoValue}>
                    {new Date(user.dateOfBirth).toLocaleDateString()}
                  </Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Star size={20} color="#6B46C1" />
                <View style={styles.infoTextContainer}>
                  <Text style={styles.infoLabel}>Zodiac Sign</Text>
                  <Text style={styles.infoValue}>
                    {userSign?.symbol} {user.zodiacSign}
                  </Text>
                </View>
              </View>
            </View>

            {userSign && (
              <View style={styles.signCard}>
                <Text style={styles.signCardTitle}>About Your Sign</Text>
                <View style={styles.signDetails}>
                  <Text style={styles.signSymbolLarge}>{userSign.symbol}</Text>
                  <View style={styles.signInfo}>
                    <Text style={styles.signName}>{userSign.name}</Text>
                    <Text style={styles.signDates}>{userSign.dates}</Text>
                    <Text style={styles.signElement}>Element: {userSign.element}</Text>
                  </View>
                </View>
              </View>
            )}

            <View style={styles.logoutContainer}>
              <Button
                title="Logout"
                onPress={handleLogout}
                variant="secondary"
              />
            </View>
          </View>
        )}
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
  profileCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: '#6B46C1',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
    marginTop: 2,
  },
  signCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  signCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  signDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signSymbolLarge: {
    fontSize: 48,
    marginRight: 16,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 20,
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
  logoutContainer: {
    marginTop: 16,
  },
});