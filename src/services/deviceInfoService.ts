import DeviceInfo from 'react-native-device-info';

export async function getDeviceModel(): Promise<string | null> {
  try {
    console.log('Device model:', DeviceInfo.getModel);
    return await DeviceInfo.getModel();
  } catch (error) {
    console.error('Error getting device model:', error);
    return null;
  }
}
