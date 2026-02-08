# Deploy backend to Render at api.minipyg.com

Deploy the **Express API** (kids-investment-app-import/server) to **Render** and serve it at **api.minipyg.com**.

---

## 1. Create a Web Service on Render

1. Go to **[render.com](https://render.com)** and sign in (or sign up with GitHub).
2. Click **Dashboard** → **New** → **Web Service**.
3. **Connect** the repo: **byadagimm8042/MiniPyg** (authorize GitHub if needed).
4. Configure:
   - **Name:** `minipyg-api` (or any name).
   - **Region:** Choose one (e.g. Oregon).
   - **Branch:** `main`.
   - **Root Directory:** `kids-investment-app-import`.
   - **Runtime:** Node.
   - **Build Command:** `npm install`.
   - **Start Command:** `npm start` (runs `node server/index.js`).
5. Click **Advanced** and add **Environment Variables**:
   - **MONGODB_URI** — Your MongoDB connection string (e.g. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) free cluster). Example: `mongodb+srv://user:pass@cluster.mongodb.net/kids-investment?retryWrites=true&w=majority`.
   - **JWT_SECRET** — A long random string for signing tokens (e.g. generate with `openssl rand -hex 32` or use a password manager).
   - **NODE_ENV** — `production` (optional; Render may set it).
6. Click **Create Web Service**. Wait for the first deploy to finish.
7. Note the **Render URL**, e.g. `https://minipyg-api-xxxx.onrender.com`.

---

## 2. Add custom domain api.minipyg.com

1. In Render: open your **Web Service** → **Settings** → **Custom Domains**.
2. Click **Add Custom Domain**.
3. Enter: **api.minipyg.com**.
4. Render will show DNS instructions. Usually:
   - **CNAME** record: name **api**, value **`your-service-name.onrender.com`** (the exact host Render shows, e.g. `minipyg-api-xxxx.onrender.com`).

---

## 3. Point api.minipyg.com to Render (GoDaddy)

1. Log in at **[godaddy.com](https://www.godaddy.com)** → **My Products** → **DNS** for **minipyg.com**.
2. Add a **CNAME** record:
   - **Name:** `api` (or `api.minipyg.com` depending on UI; often just `api`).
   - **Value:** the Render host from step 2 (e.g. `minipyg-api-xxxx.onrender.com`).
   - **TTL:** 600 (or default).
3. Save. DNS can take a few minutes up to 48 hours (often 5–15 minutes).
4. Back in Render, wait until **api.minipyg.com** shows as verified (and SSL ready).

---

## 4. Use the API from the frontend

- **Backend URL:** **https://api.minipyg.com**
- **Endpoints:**  
  - `POST /api/auth/register`  
  - `POST /api/auth/login`  
  - `GET /api/portfolio` (with `Authorization: Bearer <token>`)  
  - `POST /api/portfolio/buy`  
  - `GET /api/education/lessons`  
  - `GET /api/parent/dashboard` (with auth)  
  - etc.

In the React client (kids-investment-app-import/client), set:

- **REACT_APP_API_URL** = `https://api.minipyg.com`  
  (e.g. in `.env.production` or in the build env in Vercel/Netlify).

---

## 5. Optional: Blueprint (render.yaml)

The repo root has a **render.yaml** that defines this backend service. You can:

- Use **Blueprint** in Render: **New** → **Blueprint** → connect the repo; Render will create the Web Service from the YAML. Then set **MONGODB_URI** and **JWT_SECRET** in the service’s **Environment** and add **api.minipyg.com** under **Custom Domains** as above.

---

## Summary

| Step | Action |
|------|--------|
| 1 | Render → New → Web Service → connect **MiniPyg** repo, **Root Directory** = `kids-investment-app-import`, **Start** = `npm start` |
| 2 | Add env vars **MONGODB_URI**, **JWT_SECRET** |
| 3 | In Render: **Settings** → **Custom Domains** → add **api.minipyg.com** |
| 4 | In GoDaddy DNS: **CNAME** `api` → Render host (e.g. `minipyg-api-xxxx.onrender.com`) |
| 5 | In frontend / build env set **REACT_APP_API_URL** = `https://api.minipyg.com` |

After DNS and SSL are ready, the backend is live at **https://api.minipyg.com**.
