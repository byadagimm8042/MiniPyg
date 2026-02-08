# Quick Fix for esbuild Permission Error

## ⚡ Fastest Solution (5 minutes)

### Step 1: Add Windows Defender Exclusion

1. Press `Windows + I`
2. Go to **Privacy & Security** → **Windows Security** → **Virus & threat protection**
3. Click **Manage settings**
4. Scroll to **Exclusions** → **Add or remove exclusions**
5. Click **Add an exclusion** → **Folder**
6. Add this path:
   ```
   C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg\node_modules
   ```

### Step 2: Run Fix Script

Open PowerShell as Administrator and run:
```powershell
cd "C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg"
.\fix-esbuild.ps1
```

### Step 3: Reinstall Dependencies

```powershell
npm install
```

### Step 4: Try Again

```powershell
npm run dev
```

---

## Alternative: If Still Not Working

### Option A: Use Different Port
The issue might be port-related. Try:
```powershell
npm run dev -- --port 3000
```

### Option B: Use Production Build
Skip dev server and use preview:
```powershell
npm run build
npm run preview
```

### Option C: Run as Administrator
1. Right-click PowerShell → "Run as Administrator"
2. Navigate to project
3. Run `npm run dev`

---

## Still Having Issues?

Check:
- ✅ Windows Defender exclusions added
- ✅ Node.js processes killed
- ✅ Running as Administrator
- ✅ npm cache cleared
- ✅ node_modules permissions fixed

If all else fails, the issue might be with OneDrive syncing. Try moving the project to a local folder (not OneDrive).
