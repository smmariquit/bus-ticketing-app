import { GOOGLE_APPS_SCRIPT_URL } from '../constants/googleAppsScriptConstants';

/**
 * Save form data to Google Apps Script endpoint
 * @param formData - The data to send
 * @returns Promise resolving to the response
 */
export async function saveToGoogleAppsScript(formData: Record<string, any>): Promise<any> {
  try {
    if(!GOOGLE_APPS_SCRIPT_URL){
        console.error('Google Apps Script URL is not defined! Using default values.');
        return Promise.resolve({ success: true });
    }
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Failed to save to Google Apps Script');
    }
    return await response.json();
  } catch (error) {
    console.error('Error saving to Google Apps Script:', error);
    throw error;
  }
}
