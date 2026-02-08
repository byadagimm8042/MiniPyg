#!/usr/bin/env node
/**
 * Deploy to Google Cloud Storage
 * Requires: gcloud CLI installed and authenticated
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const BUCKET_NAME = process.env.GCS_BUCKET_NAME || 'minipyg-landing';
const PROJECT_ID = process.env.GCP_PROJECT_ID || 'YOUR_PROJECT_ID';

console.log('🚀 Deploying to Google Cloud Storage...\n');

// Check if dist folder exists
const distPath = join(process.cwd(), 'dist');
if (!existsSync(distPath)) {
  console.error('❌ dist folder not found! Run "npm run build" first.');
  process.exit(1);
}

try {
  // Check if gcloud is installed
  execSync('gcloud --version', { stdio: 'ignore' });
} catch (error) {
  console.error('❌ gcloud CLI not found. Please install Google Cloud SDK:');
  console.error('   https://cloud.google.com/sdk/docs/install');
  process.exit(1);
}

try {
  console.log('📦 Uploading files to Cloud Storage...');
  execSync(`gsutil -m rsync -r -d dist/ gs://${BUCKET_NAME}/`, {
    stdio: 'inherit'
  });

  console.log('\n✅ Deployment complete!');
  console.log(`🌐 Your site: https://storage.googleapis.com/${BUCKET_NAME}/index.html`);
  console.log(`\n💡 To set up a custom domain, use Cloud CDN.`);
} catch (error) {
  console.error('\n❌ Deployment failed:', error.message);
  console.error('\nMake sure:');
  console.error('1. You are authenticated: gcloud auth login');
  console.error('2. Project is set: gcloud config set project YOUR_PROJECT_ID');
  console.error('3. Bucket exists: gsutil mb gs://' + BUCKET_NAME);
  process.exit(1);
}
