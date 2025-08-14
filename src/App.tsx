/**
 * This React Native app provides a bus ticketing system for a POS machine.
 */

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import BusTicketingForm from './components/forms/BusTicketingForm';
import TripSummary from './components/summary/TripSummary';
import { printReceipt } from './services/printService';
import { getNextTicketNumber } from './services/ticketService';

function App() {
  return (
    <AppContent />
  );
}


function AppContent() {
  const [submittedFormData, setSubmittedFormData] = useState(null);
  // Removed showConfirm state
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

  // Removed handleConfirm
  console.log('Device model:', DeviceInfo.getModel());

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
      {!submittedFormData && (
        <BusTicketingForm onSubmit={handleFormSubmit} ticketNumber={ticketNumber || undefined} />
      )}
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
