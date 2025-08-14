import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { FormData } from './BusTicketingForm';

interface TripSummaryProps {
  formData: FormData;
}

export const TripSummary: React.FC<TripSummaryProps> = ({ formData }) => {
  if (!formData.busNumber || !formData.driver || !formData.conductor || !formData.route) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Summary</Text>
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Bus Number:</Text>
        <Text style={styles.value}>{formData.busNumber}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Driver:</Text>
        <Text style={styles.value}>{formData.driver}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Conductor:</Text>
        <Text style={styles.value}>{formData.conductor}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text style={styles.label}>Route:</Text>
        <Text style={styles.value}>{formData.route}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(43, 138, 237, 0.1)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(43, 138, 237, 0.3)',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2b8aed',
    marginBottom: 10,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: '#555',
  },
});
