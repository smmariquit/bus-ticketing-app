/**
 * This React Native app provides a bus ticketing system for a POS machine.
 *
 * Main entry point: App component renders AppContent, which manages the ticketing flow.
 *
 * AppContent handles:
 *   - Fetching the next ticket number on mount
 *   - Displaying the BusTicketingForm for ticket entry
 *   - Displaying TripSummary for confirmation and printing
 *   - Printing the receipt and resetting the form after confirmation
 *
 * Key dependencies:
 *   - DeviceInfo: Used for device model logging
 *   - printReceipt: Service to print ticket receipts
 *   - getNextTicketNumber: Service to fetch the next available ticket number
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import BusTicketingForm from './components/forms/BusTicketingForm';
import TripSummary from './components/summary/TripSummary';
import { BG_COLOR, PADDING } from './constants/styleConstants';
import { printReceipt } from './services/printService';
import { getNextTicketNumber } from './services/ticketService';

function App() {
  return <AppContent />;
}


function AppContent() {
  const [submittedFormData, setSubmittedFormData] = useState<any>(null);
  const [ticketNumber, setTicketNumber] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTicketNumber() {
      const num = await getNextTicketNumber();
      setTicketNumber(num);
    }
    fetchTicketNumber();
  }, []);

  const handleFormSubmit = (formData: any) => {
    setSubmittedFormData(formData);
  };

  // Log device model for debugging purposes
  console.log('Device model:', DeviceInfo.getModel());

  return (
  <View style={{ flex: 1, padding: PADDING, backgroundColor: BG_COLOR }}>
      {/* Render the ticketing form if no data has been submitted */}
      {!submittedFormData && (
        <BusTicketingForm onSubmit={handleFormSubmit} ticketNumber={ticketNumber || undefined} />
      )}
      {/* Render the trip summary for confirmation and printing */}
      {submittedFormData && (
        <TripSummary
          formData={submittedFormData}
          onBack={() => {
            setSubmittedFormData(null);
          }}
          onConfirm={() => {
            printReceipt(submittedFormData);
            setSubmittedFormData(null);
            getNextTicketNumber().then(setTicketNumber);
          }}
        />
      )}
    </View>
  );
}

export default App;
