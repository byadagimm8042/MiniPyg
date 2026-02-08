# Troubleshooting Localhost Connection Issues

## Check if Firewall is Blocking Connection

### Method 1: Windows Firewall Check

1. **Open Windows Security:**
   - Press `Windows + I` to open Settings
   - Go to **Privacy & Security** → **Windows Security**
   - Click **Firewall & network protection**

2. **Check Firewall Status:**
   - Look for "Domain network", "Private network", and "Public network"
   - If any show "Off", that's not the issue
   - If all show "On", continue to step 3

3. **Check Firewall Rules:**
   - Click **Advanced settings** (or search "Windows Defender Firewall with Advanced Security")
   - Click **Inbound Rules** in the left panel
   - Look for rules related to:
     - Node.js
     - Vite
     - Port 5173
   - If you see blocked rules, right-click and select **Enable Rule**

### Method 2: Temporarily Disable Firewall (Testing Only)

⚠️ **Warning:** Only do this for testing, then re-enable immediately!

1. Open **Windows Security** → **Firewall & network protection**
2. Click on your active network (Private or Public)
3. Toggle **Windows Defender Firewall** to **Off**
4. Try accessing http://localhost:5173
5. **Re-enable the firewall immediately after testing**

### Method 3: Add Firewall Exception

1. Open **Windows Defender Firewall with Advanced Security**
2. Click **Inbound Rules** → **New Rule**
3. Select **Port** → **Next**
4. Select **TCP** and enter port **5173** → **Next**
5. Select **Allow the connection** → **Next**
6. Check all profiles (Domain, Private, Public) → **Next**
7. Name it "Vite Dev Server" → **Finish**
8. Repeat for **Outbound Rules** if needed

### Method 4: Check Antivirus Software

Some antivirus software (Norton, McAfee, etc.) may block localhost connections:

1. Check your antivirus software settings
2. Look for "Firewall" or "Network Protection" settings
3. Add an exception for:
   - Node.js
   - Port 5173
   - Or temporarily disable to test

### Method 5: Check if Port is Actually Listening

Open PowerShell or Command Prompt and run:

```powershell
netstat -ano | findstr :5173
```

If you see output like:
```
TCP    0.0.0.0:5173           0.0.0.0:0              LISTENING       12345
```

The server IS running and listening. The issue might be:
- Browser cache
- Browser security settings
- Another application blocking

If you see NO output, the server isn't running.

### Method 6: Test with Different Port

If port 5173 is blocked, try a different port:

1. Edit `vite.config.ts`:
```typescript
server: {
  port: 3000,  // or 8080, 5000, etc.
  host: true,
}
```

2. Restart the dev server
3. Try http://localhost:3000

### Method 7: Check Browser Settings

Some browsers block localhost connections:

1. **Chrome/Edge:**
   - Check if any extensions are blocking
   - Try incognito mode
   - Check `chrome://net-internals/#sockets` for connection issues

2. **Firefox:**
   - Check about:config for network settings
   - Try disabling security extensions

### Quick Test Commands

Run these in PowerShell to diagnose:

```powershell
# Check if port is in use
netstat -ano | findstr :5173

# Check if Node.js is running
Get-Process node -ErrorAction SilentlyContinue

# Try to connect to the port
Test-NetConnection -ComputerName localhost -Port 5173
```

### Alternative: Use Production Build

If dev server won't work, use the production build:

```bash
npm run build
npm run preview
```

This will serve on a different port (usually 4173) and might bypass firewall issues.

---

## Common Solutions

1. **Restart everything:**
   - Close all terminal windows
   - Kill all Node processes: `taskkill /F /IM node.exe`
   - Restart your computer
   - Run `npm run dev` again

2. **Check for port conflicts:**
   - Another app might be using port 5173
   - Change the port in `vite.config.ts`

3. **Run as Administrator:**
   - Right-click terminal → "Run as Administrator"
   - Run `npm run dev`

4. **Check Windows Defender:**
   - Windows Security → Virus & threat protection
   - Check if it's blocking Node.js
