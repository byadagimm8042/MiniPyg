/**
 * Google Apps Script for MiniPyg Form Submissions
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Create a Google Sheet and note its ID (from the URL)
 * 5. Update the SPREADSHEET_ID below
 * 6. Deploy as a web app with:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Copy the web app URL and use it as VITE_GOOGLE_SCRIPT_URL
 */

const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE'; // Replace with your Google Sheet ID

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    
    if (data.formType === 'pilot') {
      const pilotSheet = sheet.getSheetByName('Pilot Submissions') || sheet.insertSheet('Pilot Submissions');
      
      // Set headers if this is the first row
      if (pilotSheet.getLastRow() === 0) {
        pilotSheet.appendRow([
          'Timestamp',
          'Name',
          'Email',
          'Age Band',
          'Frequency',
          'Commitment',
          'Feedback Willing'
        ]);
      }
      
      pilotSheet.appendRow([
        data.data.timestamp || new Date().toISOString(),
        data.data.name,
        data.data.email,
        data.data.ageBand,
        data.data.frequency,
        data.data.commit ? 'Yes' : 'No',
        data.data.feedback ? 'Yes' : 'No'
      ]);
    } else if (data.formType === 'checkout') {
      const checkoutSheet = sheet.getSheetByName('Checkout Submissions') || sheet.insertSheet('Checkout Submissions');
      
      // Set headers if this is the first row
      if (checkoutSheet.getLastRow() === 0) {
        checkoutSheet.appendRow([
          'Timestamp',
          'Name',
          'Email',
          'Plan',
          'Price',
          'Commitment'
        ]);
      }
      
      checkoutSheet.appendRow([
        data.data.timestamp || new Date().toISOString(),
        data.data.name,
        data.data.email,
        data.data.plan,
        data.data.price,
        data.data.commit ? 'Yes' : 'No'
      ]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      error: error.toString() 
    }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
