// Script to help deploy to Netlify
// This uses Netlify's API to deploy

const fs = require('fs');
const path = require('path');
const https = require('https');
const FormData = require('form-data');

console.log('📦 Preparing deployment...');

const distPath = path.join(__dirname, 'dist');

if (!fs.existsSync(distPath)) {
  console.error('❌ dist folder not found! Please run "npm run build" first.');
  process.exit(1);
}

console.log('✅ dist folder found');
console.log('\n📤 To deploy to Netlify:');
console.log('1. Go to https://app.netlify.com/drop');
console.log('2. Drag and drop the "dist" folder');
console.log('3. Your site will be live in seconds!\n');

console.log('Or use Netlify CLI:');
console.log('  npx netlify-cli deploy --dir=dist --prod\n');
