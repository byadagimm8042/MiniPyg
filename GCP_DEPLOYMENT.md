# Deploy MiniPyg to Google Cloud Platform

This guide covers deploying MiniPyg MoneyWise Kids to GCP using Firebase Hosting (recommended) or Cloud Storage.

## Option 1: Firebase Hosting (Recommended - Easiest)

Firebase Hosting is the easiest way to deploy static sites on GCP with a free tier.

### Prerequisites
- Google account
- Node.js installed
- Firebase CLI installed

### Step 1: Install Firebase CLI
```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase
```bash
firebase login
```

### Step 3: Initialize Firebase Project
```bash
firebase init hosting
```

When prompted:
- Select "Use an existing project" or "Create a new project"
- Set public directory: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds: `No` (we'll build manually)

### Step 4: Update .firebaserc
Edit `.firebaserc` and replace `YOUR_PROJECT_ID` with your Firebase project ID.

### Step 5: Build and Deploy
```bash
npm run build
firebase deploy --only hosting
```

### Step 6: Access Your Site
Your site will be live at: `https://YOUR_PROJECT_ID.web.app`

You can also set a custom domain in Firebase Console.

---

## Option 2: Cloud Storage + Cloud CDN

For more control, you can use Cloud Storage with Cloud CDN.

### Prerequisites
- Google Cloud SDK (gcloud) installed
- GCP project created
- Billing enabled (for Cloud CDN)

### Step 1: Install Google Cloud SDK
Download from: https://cloud.google.com/sdk/docs/install

### Step 2: Authenticate
```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: Create Storage Bucket
```bash
gsutil mb -p YOUR_PROJECT_ID -c STANDARD -l us-central1 gs://minipyg-landing
```

### Step 4: Enable Static Website Hosting
```bash
gsutil web set -m index.html -e index.html gs://minipyg-landing
```

### Step 5: Build and Upload
```bash
npm run build
gsutil -m rsync -r dist/ gs://minipyg-landing/
```

### Step 6: Set Public Access
```bash
gsutil iam ch allUsers:objectViewer gs://minipyg-landing
```

### Step 7: Access Your Site
Your site will be at: `https://storage.googleapis.com/minipyg-landing/index.html`

Or set up a custom domain with Cloud CDN.

---

## Option 3: App Engine (Static Files)

### Step 1: Create app.yaml
```yaml
runtime: python39

handlers:
- url: /
  static_files: dist/index.html
  upload: dist/index.html

- url: /(.*)
  static_files: dist/\1
  upload: dist/(.*)
```

### Step 2: Deploy
```bash
npm run build
gcloud app deploy
```

---

## Quick Deploy Script

I've created a deploy script for Firebase Hosting. Run:

```bash
npm run deploy
```

Or manually:
```bash
npm run build && firebase deploy --only hosting
```

---

## Environment Variables

For production, make sure to set your Google Sheets URL:
- In Firebase Console → Hosting → Environment variables
- Or use Firebase Functions to inject env vars

---

## Custom Domain Setup

### Firebase Hosting:
1. Go to Firebase Console → Hosting
2. Click "Add custom domain"
3. Follow DNS setup instructions

### Cloud Storage + CDN:
1. Create Cloud CDN backend bucket
2. Configure custom domain in Cloud CDN
3. Update DNS records

---

## Cost Estimate

- **Firebase Hosting**: Free tier includes 10GB storage, 360MB/day transfer
- **Cloud Storage**: ~$0.026/GB/month + transfer costs
- **Cloud CDN**: ~$0.08/GB for egress

For most sites, Firebase Hosting free tier is sufficient.

---

## Troubleshooting

**Build fails?**
- Make sure `npm run build` completes successfully
- Check that `dist` folder exists

**Deploy fails?**
- Verify Firebase/Cloud SDK is authenticated
- Check project ID is correct
- Ensure billing is enabled (for some services)

**Site not loading?**
- Check Firebase Console for deployment status
- Verify `dist/index.html` exists
- Check browser console for errors
