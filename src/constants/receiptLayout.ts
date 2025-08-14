// Receipt layout constants for bus ticketing system
export const RECEIPT_LAYOUT = [
  { key: 'receiptNumber', label: 'Receipt #' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'busNumber', label: 'Bus Number' },
  { key: 'driver', label: 'Driver' },
  { key: 'conductor', label: 'Conductor' },
  { key: 'route', label: 'Route' },
  { key: 'fromStop', label: 'From' },
  { key: 'toStop', label: 'To' },
  { key: 'passengerCategory', label: 'Passenger' },
  { key: 'fare', label: 'Fare Amount', format: (v: number) => `₱${v?.toFixed(2)}` },
]