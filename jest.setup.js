// import jest
jest.mock('react-native-device-info', () => ({
  getModel: () => 'TestDevice',
  // Add other mocked methods if needed
}));

// Mock Sunmi printer library
jest.mock('@mitsuharu/react-native-sunmi-printer-library', () => ({
  prepare: jest.fn(),
  setAlignment: jest.fn(),
  setFontSize: jest.fn(),
  printText: jest.fn(),
}));