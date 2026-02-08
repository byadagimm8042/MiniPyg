# Push kids-investment-app to GitHub

Use these steps from **your PC** (Git must be installed and in PATH). The guide assumes the project is at `C:\Users\roopa\kids-investment-app`.

---

## 1. Install Git (if needed)

- Download: https://git-scm.com/download/win  
- Install and restart your terminal. Check: `git --version`

---

## 2. Open terminal in the project folder

```powershell
cd C:\Users\roopa\kids-investment-app
```

---

## 3. Initialize Git and first commit

A `.gitignore` was added to this folder so `node_modules` and `.env` are not pushed.

Run:

```powershell
git init
git add .
git status
```

Review the list (no `node_modules` or `.env`). Then:

```powershell
git commit -m "Initial commit: kids-investment-app landing page and app"
```

---

## 4. Create a new repository on GitHub

1. Go to https://github.com/new  
2. **Repository name:** e.g. `kids-investment-app` (or any name you like)  
3. **Description:** optional  
4. Choose **Public**  
5. **Do not** check “Add a README”, “Add .gitignore”, or “Choose a license” (you already have files)  
6. Click **Create repository**

---

## 5. Connect and push

GitHub will show commands. Use these (replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repo name):

```powershell
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Example if your username is `roopa` and repo is `kids-investment-app`:

```powershell
git remote add origin https://github.com/roopa/kids-investment-app.git
git branch -M main
git push -u origin main
```

Enter your GitHub username and (when asked) a **Personal Access Token** as the password — GitHub no longer accepts account passwords for Git over HTTPS.

---

## 6. Create a Personal Access Token (if you don’t have one)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**  
2. **Generate new token (classic)**  
3. Name it (e.g. “kids-investment-app”), choose expiry, check **repo**  
4. Generate and **copy the token**  
5. When `git push` asks for a password, paste this token (not your GitHub password)

---

## Quick copy-paste (after creating the repo on GitHub)

```powershell
cd C:\Users\roopa\kids-investment-app
git init
git add .
git commit -m "Initial commit: kids-investment-app landing page and app"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your actual GitHub username and repository name.
