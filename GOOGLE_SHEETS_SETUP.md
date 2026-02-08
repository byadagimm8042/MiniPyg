# Google Sheets Integration Setup

This guide will help you set up Google Sheets to store form submissions from your MiniPyg MoneyWise Kids landing page.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "MiniPyg Form Submissions" (or any name you prefer)
4. Copy the **Spreadsheet ID** from the URL:
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit`
   - Copy the part between `/d/` and `/edit`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code and paste the contents of `google-apps-script.js`
4. Replace `YOUR_SPREADSHEET_ID_HERE` with your actual Spreadsheet ID from Step 1
5. Click "Save" (💾 icon) and name your project (e.g., "MiniPyg Form Handler")

## Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
3. Configure:
   - **Description**: "MiniPyg Form Submissions Handler"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your website to submit data)
4. Click "Deploy"
5. **Copy the Web App URL** - you'll need this for the next step

## Step 4: Configure Your App

1. Create a `.env` file in your project root (copy from `.env.example` if it exists)
2. Add your Google Script URL:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
3. Replace `YOUR_SCRIPT_ID` with the actual ID from your Web App URL

## Step 5: Test

1. Restart your dev server: `npm run dev`
2. Fill out a form on your landing page
3. Check your Google Sheet - you should see the data appear in two sheets:
   - **Pilot Submissions**: For the 14-day pilot signup form
   - **Checkout Submissions**: For the pricing/fake checkout form

## Troubleshooting

- **Data not appearing?** Make sure the Web App is deployed with "Anyone" access
- **CORS errors?** The script uses `no-cors` mode, so errors won't show in console, but data should still be saved
- **Permission errors?** Make sure you authorized the script when first deploying

## Alternative: Using Google Forms

If you prefer Google Forms instead:

1. Create a Google Form for each form type
2. Get the form submission URL
3. Update the form submission functions to POST directly to the form URL
4. Note: This requires a different approach and won't give you as much control over the data structure

## Security Note

The Google Apps Script web app URL will be visible in your frontend code. This is acceptable for form submissions, but:
- The script only allows POST requests
- It only writes to your specific spreadsheet
- Consider adding rate limiting or validation in the script if needed
