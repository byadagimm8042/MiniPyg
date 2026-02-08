# Run kids-investment-app on localhost

## 1. Open terminal in this folder

```text
cd C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg\kids-investment-app-import
```

(Or in Cursor: right-click `kids-investment-app-import` → **Open in Integrated Terminal**.)

---

## 2. Install dependencies (first time only)

**Root:**
```bash
npm install
```

**Client:**
```bash
cd client
npm install
cd ..
```

Or in one line:
```bash
npm install
cd client && npm install && cd ..
```

---

## 3. Start the app

**Option A – One command (server + client together)**

```bash
npm run dev
```

This starts:
- **API server** on http://localhost:3003  
- **React app** on http://localhost:3000  

**Option B – Windows: double-click**

Double-click **`run-app.bat`** in the `kids-investment-app-import` folder.  
It opens two windows (server and client). Then open http://localhost:3000 in your browser.

**Option C – Two terminals**

- **Terminal 1:** `node server/index.js` (server on 3003)  
- **Terminal 2:** `cd client && npm start` (React on 3000)

---

## 4. Open in browser

Go to: **http://localhost:3000**

You should see the Kids Investment App (login / signup).

---

## 5. Optional: landing page only

To serve just the HTML landing page (no React, no API):

```bash
node server-landing.js
```

Then open: **http://localhost:8080**

---

## If PowerShell blocks npm

Use **Command Prompt (cmd)** instead of PowerShell, or run:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run the commands above again.
