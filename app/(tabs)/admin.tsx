import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GradientBackground from '../../components/GradientBackground';
import { Shield, MessageSquare, Clock, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

interface FeedbackRecord {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  created_at: string;
  updated_at: string;
}

export default function AdminScreen() {
  const [feedback, setFeedback] = useState<FeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed' | 'resolved'>('all');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      // Mock data for demo purposes
      const mockData: FeedbackRecord[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Great app! Love the horoscope feature.',
          status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          message: 'The numerology calculator is very accurate.',
          status: 'reviewed',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          updated_at: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      setFeedback(mockData);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const updateFeedbackStatus = async (id: string, status: 'pending' | 'reviewed' | 'resolved') => {
    try {
      // Update local state
      setFeedback(prev => 
        prev.map(item => 
          item.id === id ? { ...item, status } : item
        )
      );
    } catch (error) {
      console.error('Error updating feedback status:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeedback();
  };

  const filteredFeedback = feedback.filter(item => 
    filter === 'all' || item.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color="#F59E0B" />;
      case 'reviewed':
        return <AlertCircle size={16} color="#3B82F6" />;
      case 'resolved':
        return <CheckCircle size={16} color="#10B981" />;
      default:
        return <Clock size={16} color="#F59E0B" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B';
      case 'reviewed':
        return '#3B82F6';
      case 'resolved':
        return '#10B981';
      default:
        return '#F59E0B';
    }
  };

  return (
    <GradientBackground>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Shield size={48} color="#F59E0B" />
          <Text style={styles.title}>Admin Dashboard</Text>
          <Text style={styles.subtitle}>Manage user feedback</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>Feedback Overview</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{feedback.length}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#F59E0B' }]}>
                  {feedback.filter(f => f.status === 'pending').length}
                </Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: '#10B981' }]}>
                  {feedback.filter(f => f.status === 'resolved').length}
                </Text>
                <Text style={styles.statLabel}>Resolved</Text>
              </View>
            </View>
          </View>

          <View style={styles.filterCard}>
            <Text style={styles.filterLabel}>Filter by Status</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={filter}
                onValueChange={setFilter}
                style={styles.picker}
              >
                <Picker.Item label="All Feedback" value="all" color="#FFFFFF" />
                <Picker.Item label="Pending" value="pending" color="#FFFFFF" />
                <Picker.Item label="Reviewed" value="reviewed" color="#FFFFFF" />
                <Picker.Item label="Resolved" value="resolved" color="#FFFFFF" />
              </Picker>
            </View>
          </View>

          {filteredFeedback.map((item) => (
            <View key={item.id} style={styles.feedbackCard}>
              <View style={styles.feedbackHeader}>
                <View style={styles.feedbackInfo}>
                  <Text style={styles.feedbackName}>{item.name}</Text>
                  <Text style={styles.feedbackEmail}>{item.email}</Text>
                </View>
                <View style={styles.statusContainer}>
                  {getStatusIcon(item.status)}
                  <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.feedbackMessage}>{item.message}</Text>
              
              <View style={styles.feedbackFooter}>
                <Text style={styles.feedbackDate}>
                  {new Date(item.created_at).toLocaleDateString()} at{' '}
                  {new Date(item.created_at).toLocaleTimeString()}
                </Text>
                
                <View style={styles.actionButtons}>
                  {item.status === 'pending' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#3B82F6' }]}
                      onPress={() => updateFeedbackStatus(item.id, 'reviewed')}
                    >
                      <Text style={styles.actionButtonText}>Mark Reviewed</Text>
                    </TouchableOpacity>
                  )}
                  {item.status !== 'resolved' && (
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: '#10B981' }]}
                      onPress={() => updateFeedbackStatus(item.id, 'resolved')}
                    >
                      <Text style={styles.actionButtonText}>Mark Resolved</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          ))}

          {filteredFeedback.length === 0 && !loading && (
            <View style={styles.emptyState}>
              <MessageSquare size={48} color="#6B7280" />
              <Text style={styles.emptyTitle}>No feedback found</Text>
              <Text style={styles.emptyText}>
                {filter === 'all' 
                  ? 'No feedback has been submitted yet.'
                  : `No ${filter} feedback found.`
                }
              </Text>
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
  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  statLabel: {
    fontSize: 12,
    color: '#D1D5DB',
    marginTop: 4,
  },
  filterCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  filterLabel: {
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
  feedbackCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  feedbackInfo: {
    flex: 1,
  },
  feedbackName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  feedbackEmail: {
    fontSize: 14,
    color: '#D1D5DB',
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
  },
  feedbackMessage: {
    fontSize: 14,
    color: '#E5E7EB',
    lineHeight: 20,
    marginBottom: 16,
  },
  feedbackFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feedbackDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginTop: 8,
  },
});