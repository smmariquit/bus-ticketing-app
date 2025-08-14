import * as SunmiPrinterLibrary from '@mitsuharu/react-native-sunmi-printer-library';
import { RECEIPT_FONT_SIZE, RECEIPT_LINE_SPACING } from '../constants/receiptConstants';
import { RECEIPT_LAYOUT } from '../constants/receiptLayout';
import { getDeviceModel } from './deviceInfoService';

// Prepare Sunmi printer at module load to ensure it's ready for first print
try {
  SunmiPrinterLibrary.prepare();
} catch (e) {
  // Ignore errors if not on Sunmi device
}

const SUPPORTED_DEVICES = [
  'V2s', // Sunmi V2s
  // Add more supported device models here
];

export async function printReceipt(formData: Record<string, any>) {
  if (!formData || typeof formData !== 'object') {
    console.error('Invalid form data provided to printReceipt:', formData);
    return;
  }

  // Check for required fields, but allow ticketNumber/receiptNumber to be optional
  for (const item of RECEIPT_LAYOUT) {
    if ((item.key === 'receiptNumber' || item.key === 'ticketNumber')) {
      // skip optional ticket/receipt number
      continue;
    }
    if (formData[item.key] === undefined || formData[item.key] === null || (typeof formData[item.key] === 'string' && formData[item.key].trim() === '')) {
      console.error(`Missing or invalid value for: ${item.label}`);
      // Optionally, you can show a user notification here
      return;
    }
  }

  // Header: no empty lines between details, only one blank line above and one below
  const headerLines = [
    '',
    'COMPANY NAME',
    '123 Main St, City, Country',
    'TIN:123-456-789-000',
    ''
  ];
  const model = await getDeviceModel();
  // If it starts with any of the strings in SUPPORTED_DEVICES
  const isSupported = model ? SUPPORTED_DEVICES.some(device => model.startsWith(device)) : false;
  if (isSupported) {
    try {
      SunmiPrinterLibrary.prepare();
      await SunmiPrinterLibrary.setAlignment('center');
      // Print header centered, no empty lines between details
      SunmiPrinterLibrary.setFontSize(RECEIPT_FONT_SIZE + 2);
      SunmiPrinterLibrary.printText(headerLines.slice(1, 4).join('\n') + '\n');
      SunmiPrinterLibrary.setFontSize(RECEIPT_FONT_SIZE);
      await SunmiPrinterLibrary.setAlignment('left');
      for (const item of RECEIPT_LAYOUT) {
        const value = formData[item.key];
        const formattedValue = item.format ? item.format(value) : value;
        SunmiPrinterLibrary.setFontSize(RECEIPT_FONT_SIZE);
        // Left align trip details, no justification
        SunmiPrinterLibrary.printText(`${item.label}: ${formattedValue}`);
        if (RECEIPT_LINE_SPACING > 0) {
          SunmiPrinterLibrary.printText('\n'.repeat(RECEIPT_LINE_SPACING));
        }
      }
      // Add 2 blank lines at the bottom
      SunmiPrinterLibrary.printText('\n\n\n\n');
    } catch (error) {
      console.error('Error printing receipt:', error);
    }
  } else {
    // Generic Android phone: fallback logic
    let receiptText = '';
    // Print header, no empty lines between details
    receiptText += headerLines.slice(1, 4).join('\n') + '\n';
    // Only one blank line between header and body
    receiptText += '\n';
    for (const item of RECEIPT_LAYOUT) {
      const value = formData[item.key];
      const formattedValue = item.format ? item.format(value) : value;
      // Left align trip details, no justification
      receiptText += `${item.label}: ${formattedValue}\n`;
      if (RECEIPT_LINE_SPACING > 0) {
        receiptText += '\n'.repeat(RECEIPT_LINE_SPACING);
      }
    }
    // Add 2 blank lines at the bottom
    receiptText += '\n\n';
    console.log('Generic print (not Sunmi):\n' + receiptText);
    // You can replace this with another print method if needed
  }
}
