# Fix esbuild Permission Error (spawn EPERM)

## Quick Fixes (Try in Order)

### Solution 1: Add Windows Defender Exclusions

1. **Open Windows Security:**
   - Press `Windows + I` → **Privacy & Security** → **Windows Security**
   - Click **Virus & threat protection**
   - Click **Manage settings** under "Virus & threat protection settings"
   - Scroll down to **Exclusions**
   - Click **Add or remove exclusions**

2. **Add These Exclusions:**
   - Click **Add an exclusion** → **Folder**
   - Add: `C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg\node_modules`
   - Add: `C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg\.vite`
   - Add: `C:\Users\roopa\AppData\Local\npm` (if it exists)
   - Add: `C:\Users\roopa\AppData\Roaming\npm` (if it exists)

3. **Add Process Exclusions:**
   - Click **Add an exclusion** → **Process**
   - Add: `node.exe`
   - Add: `esbuild.exe` (if found in node_modules)

### Solution 2: Reinstall Node Modules

Run these commands in your project directory:

```powershell
# Kill all Node processes
taskkill /F /IM node.exe

# Remove node_modules and package-lock
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Solution 3: Fix File Permissions

Run PowerShell as Administrator and execute:

```powershell
# Navigate to project
cd "C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg"

# Take ownership and grant full control
icacls "node_modules" /grant "${env:USERNAME}:(OI)(CI)F" /T
icacls ".vite" /grant "${env:USERNAME}:(OI)(CI)F" /T
```

### Solution 4: Use Alternative esbuild Configuration

If the above doesn't work, we can configure Vite to use a different esbuild setup.

### Solution 5: Run as Administrator

1. Right-click on your terminal/command prompt
2. Select **"Run as Administrator"**
3. Navigate to your project
4. Run `npm run dev`

---

## Automated Fix Script

I've created a PowerShell script to automate these fixes. Run it as Administrator.
