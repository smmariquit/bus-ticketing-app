import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { FormData } from '../forms/BusTicketingForm';

interface TripSummaryProps {
  formData: FormData;
  onBack: () => void;
  onConfirm: () => void;
}

const TripSummary: React.FC<TripSummaryProps> = ({ formData, onBack, onConfirm }) => {
  if (!formData) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Summary</Text>
      <View style={styles.summaryRow}><Text style={styles.label}>Ticket Number:</Text><Text style={styles.value}>{formData.ticketNumber || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Bus Number:</Text><Text style={styles.value}>{formData.busNumber || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Driver:</Text><Text style={styles.value}>{formData.driver || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Conductor:</Text><Text style={styles.value}>{formData.conductor || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Route:</Text><Text style={styles.value}>{formData.route || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Passenger Category:</Text><Text style={styles.value}>{formData.passengerCategory || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>From Stop:</Text><Text style={styles.value}>{formData.fromStop || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>To Stop:</Text><Text style={styles.value}>{formData.toStop || '-'}</Text></View>
      <View style={styles.summaryRow}><Text style={styles.label}>Fare:</Text><Text style={styles.value}>{formData.fare != null ? `₱${formData.fare}` : '-'}</Text></View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
          <Text style={styles.buttonText}>PRINT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TripSummary;

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 15,
  },
  backButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#2b8aed',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
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
