# Quick Google Sheets Setup

## 🚀 Fast Setup (5 minutes)

### Option 1: Use the Setup Helper
1. Open `setup-google-sheets.html` in your browser
2. Follow the interactive steps

### Option 2: Manual Setup

#### 1. Create Google Sheet
- Go to: https://sheets.google.com/create
- Name it: **MiniPyg Form Submissions**
- Copy the **Spreadsheet ID** from the URL (between `/d/` and `/edit`)

#### 2. Create Google Apps Script
- Go to: https://script.google.com/home/start
- Click "New Project"
- Paste the code from `google-apps-script.js`
- Replace `YOUR_SPREADSHEET_ID_HERE` with your Spreadsheet ID
- Save the project

#### 3. Deploy as Web App
- Click "Deploy" → "New deployment"
- Click gear ⚙️ → Select "Web app"
- Settings:
  - Execute as: **Me**
  - Who has access: **Anyone**
- Click "Deploy"
- **Copy the Web App URL**

#### 4. Add to Your Project
Create a `.env` file in your project root:
```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with the ID from your Web App URL.

#### 5. Restart & Test
```bash
npm run dev
```

Fill out a form and check your Google Sheet!

---

## 📊 What Gets Saved

### Pilot Submissions Sheet
- Timestamp
- Name
- Email
- Age Band
- Frequency
- Commitment (Yes/No)
- Feedback Willing (Yes/No)

### Checkout Submissions Sheet
- Timestamp
- Name
- Email
- Plan (Premium/Family Plus/School Pilot)
- Price
- Commitment (Yes/No)

---

## 🔧 Troubleshooting

**Data not appearing?**
- Make sure Web App is deployed with "Anyone" access
- Check that you authorized the script (first time only)
- Verify the Spreadsheet ID is correct

**Still not working?**
- Check browser console for errors
- Verify `.env` file is in project root
- Restart dev server after adding `.env`
