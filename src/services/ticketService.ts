import { GOOGLE_APPS_SCRIPT_URL_GET } from '../constants/googleAppsScriptConstants';

export async function getNextTicketNumber(): Promise<number> {
  try {
    let rowCount = 0;
    if(!GOOGLE_APPS_SCRIPT_URL_GET){
        return Promise.resolve(rowCount);
    }
    const response = await fetch(`${GOOGLE_APPS_SCRIPT_URL_GET}?action=getRowCount`);
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      if (typeof data.rowCount === 'number') {
        rowCount = data.rowCount;
      }
    } catch (jsonError) {
      console.error('Error parsing row count response:', jsonError, text);
    }
    return rowCount + 1;
  } catch (error) {
    console.error('Error fetching ticket number:', error);
    return 1;
  }
}
