import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { MessageCircle, CheckCircle } from 'lucide-react-native';

interface FeedbackData {
  name: string;
  email: string;
  message: string;
}

export default function FeedbackScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    
    try {
      const feedbackData: FeedbackData = {
        name,
        email,
        message,
      };
      
      console.log('Feedback submitted:', feedbackData);
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
      
    } catch (error) {
      console.log('Feedback would be submitted:', { name, email, message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GradientBackground>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <MessageCircle size={48} color="#F59E0B" />
          <Text style={styles.title}>Feedback</Text>
          <Text style={styles.subtitle}>Share your thoughts and suggestions with us</Text>
        </View>

        <View style={styles.content}>
          {submitted ? (
            <View style={styles.successCard}>
              <CheckCircle size={48} color="#10B981" />
              <Text style={styles.successTitle}>Thank You!</Text>
              <Text style={styles.successText}>
                Your feedback has been submitted successfully. We appreciate your input!
              </Text>
            </View>
          ) : (
            <View style={styles.formCard}>
              <Input
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Your full name"
              />
              
              <Input
                label="Email"
                value={email}
                onChangeText={setEmail}
                placeholder="your.email@example.com"
                keyboardType="email-address"
              />
              
              <View style={styles.messageContainer}>
                <Text style={styles.messageLabel}>Message</Text>
                <TextInput
                  style={styles.messageInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Share your feedback, suggestions, or questions..."
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                />
              </View>

              <Button
                title="Submit Feedback"
                onPress={handleSubmit}
                loading={loading}
              />
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
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 24,
    borderRadius: 16,
  },
  messageContainer: {
    marginBottom: 20,
  },
  messageLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#E5E7EB',
    marginBottom: 8,
  },
  messageInput: {
    backgroundColor: '#1F2937',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
    minHeight: 120,
  },
  successCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 12,
  },
  successText: {
    fontSize: 16,
    color: '#D1D5DB',
    textAlign: 'center',
    lineHeight: 24,
  },
});