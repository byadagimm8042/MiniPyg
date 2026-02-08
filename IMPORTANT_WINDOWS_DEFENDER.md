# ⚠️ CRITICAL: Add Windows Defender Exclusion NOW

The permission errors you're seeing are because **Windows Defender is blocking esbuild and Node.js** from accessing files in your `node_modules` folder.

## 🚨 MUST DO THIS FIRST:

### Add Windows Defender Exclusion (Takes 2 minutes)

1. **Press `Windows + I`** to open Settings
2. Go to **Privacy & Security** → **Windows Security**
3. Click **Virus & threat protection**
4. Click **Manage settings** (under "Virus & threat protection settings")
5. Scroll down to **Exclusions**
6. Click **Add or remove exclusions**
7. Click **Add an exclusion** → **Folder**
8. Add this exact path:
   ```
   C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg\node_modules
   ```
9. Click **Add an exclusion** → **Folder** again
10. Add this path:
    ```
    C:\Users\roopa\OneDrive\Documents\New_Project_Cursor_MiniPyg
    ```

### Also Add Process Exclusions:

1. In the same Exclusions window
2. Click **Add an exclusion** → **Process**
3. Add: `node.exe`
4. Add: `esbuild.exe`

---

## Why This Is Happening:

Your project is in **OneDrive**, which can cause file locking issues. Windows Defender is also scanning and blocking esbuild from executing.

**After adding exclusions, restart your terminal and try `npm run dev` again.**

---

## Alternative: Move Project Out of OneDrive

If issues persist, consider moving the project to a local folder:
- `C:\Projects\New_Project_Cursor_MiniPyg`
- This avoids OneDrive sync conflicts
