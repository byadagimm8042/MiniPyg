# Deploy API on Render + api.minipyg.com — Quick steps

Copy this checklist and follow it in order.

---

## Part 1: Render (≈5 min)

1. Open **https://render.com** → sign in with GitHub.
2. **Dashboard** → **New** → **Web Service**.
3. Connect repo: **byadagimm8042/MiniPyg** (branch **main**).
4. Set:
   - **Root Directory:** `kids-investment-app-import`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. **Environment Variables** (Add):
   - `MONGODB_URI` = your MongoDB Atlas (or other) connection string
   - `JWT_SECRET` = long random string (e.g. 32+ chars)
6. **Create Web Service** → wait until deploy is **Live**.
7. Copy the **Render URL** (e.g. `https://minipyg-api-xxxx.onrender.com`).

---

## Part 2: Custom domain api.minipyg.com on Render

1. In your Web Service → **Settings** → **Custom Domains**.
2. **Add Custom Domain** → type: **api.minipyg.com**.
3. Render shows a hostname (e.g. `minipyg-api-xxxx.onrender.com`). Keep this for Part 3.

---

## Part 3: GoDaddy DNS

1. Go to **godaddy.com** → **My Products** → **DNS** for **minipyg.com**.
2. **Add** a **CNAME** record:
   - **Name:** `api`
   - **Value:** the Render hostname from Part 2 (e.g. `minipyg-api-xxxx.onrender.com`)
   - **TTL:** 600
3. **Save**.

---

## Part 4: Verify

1. Wait 5–15 min (sometimes up to 48h).
2. In Render, **api.minipyg.com** should show **Verified** (and SSL ready).
3. In browser open: **https://api.minipyg.com/api/education/lessons**  
   You should see JSON (e.g. lessons array).

---

Done. Backend is at **https://api.minipyg.com**.  
Next: set **REACT_APP_API_URL** = `https://api.minipyg.com` in your frontend (Vercel) and redeploy — see **CONNECT_FRONTEND_BACKEND.md**.
