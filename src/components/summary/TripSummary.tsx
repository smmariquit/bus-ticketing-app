// src/components/summary/TripSummary.tsx

import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Style from '../../constants/styleConstants';
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
    marginTop: Style.BUTTON_PADDING_HORIZONTAL,
    gap: Style.BUTTON_GAP,
  },
  backButton: {
    backgroundColor: Style.COLOR_SECONDARY,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: Style.BUTTON_PADDING_HORIZONTAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    flex: 1,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: Style.COLOR_PRIMARY,
    paddingVertical: Style.BUTTON_PADDING_VERTICAL,
    paddingHorizontal: Style.BUTTON_PADDING_HORIZONTAL,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: Style.COLOR_BG_SUMMARY,
    padding: Style.PADDING,
    borderRadius: Style.BORDER_RADIUS_SMALL,
    marginBottom: Style.BUTTON_PADDING_HORIZONTAL,
    borderWidth: 1,
    borderColor: Style.COLOR_BORDER_SUMMARY,
  },
  title: {
    fontSize: Style.FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
    color: Style.COLOR_PRIMARY,
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
    color: Style.COLOR_TEXT,
    fontWeight: '600',
  },
  value: {
    fontSize: 14,
    color: Style.COLOR_TEXT_MUTED,
  },
});
