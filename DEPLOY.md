# Deploy MiniPyg Landing Page to Live URL

Your React app is built and ready to deploy! Here are the easiest ways to get it live:

## ✅ Option 1: Netlify Drop (Easiest - No Account Needed Initially)

1. **Build the project** (already done):
   ```bash
   npm run build
   ```

2. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)**

3. **Drag and drop the `dist` folder** onto the page

4. Your site will be live instantly with a URL like: `random-name-123.netlify.app`

5. You can customize the URL later in the Netlify dashboard

## ✅ Option 2: Vercel (Recommended for React Apps)

1. **Build the project** (already done):
   ```bash
   npm run build
   ```

2. Go to **[https://vercel.com](https://vercel.com)** and sign up (free)

3. Click **"Add New Project"**

4. **Drag and drop the `dist` folder** OR connect your Git repository

5. Vercel will auto-detect it's a Vite/React app and deploy it

6. Your site will be live with a URL like: `minipyg-landing.vercel.app`

## ✅ Option 3: Netlify (With Account)

1. Go to **[https://www.netlify.com](https://www.netlify.com)** and sign up (free)

2. Click **"Add new site"** → **"Deploy manually"**

3. **Drag and drop the `dist` folder**

4. Your site will be live instantly

## ✅ Option 4: GitHub Pages

1. Create a new repository on GitHub

2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

3. Go to **Settings → Pages** in your GitHub repo

4. Select **Source: GitHub Actions** or use a custom workflow

5. Your site will be at: `yourusername.github.io/repository-name`

## 🚀 Quick Deploy Commands

### For Netlify (after login):
```bash
npx netlify-cli deploy --dir=dist --prod
```

### For Vercel (after login):
```bash
npx vercel --prod
```

---

**Recommended**: Use **Netlify Drop** (Option 1) - it's the fastest and requires no signup initially!

Your built files are in the `dist` folder and ready to deploy! 🎉
