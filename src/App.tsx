/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import { View, Text } from 'react-native';
import BusTicketingForm from './components/BusTicketingForm';
import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library';
import { RECEIPT_LAYOUT } from './constants/receiptLayout';


function App() {

  return (
    <AppContent />
  );
}

async function printReceipt(formData) {
  try {
    SunmiPrinterLibrary.prepare();
    // Print receipt based on #receiptLayout.ts
    for (const item of RECEIPT_LAYOUT) {
      const value = formData[item.key];
      const formattedValue = item.format ? item.format(value) : value;
      SunmiPrinterLibrary.printText(`${item.label}: ${formattedValue}\n`);
    }
  } catch (error) {
    console.error('Error printing receipt:', error);
  }
}

function AppContent() {
  return (
    <View>
      <BusTicketingForm onSubmit={formData => {
        console.log('Form submitted:', formData);
        printReceipt(formData);

      }} />
    </View>
  );
}

export default App;
