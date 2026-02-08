# Connect frontend (minipyg.com) and backend (api.minipyg.com)

Steps to wire the **Vercel frontend** (minipyg.com) to the **Render backend** (api.minipyg.com).

---

## Keep backend local until ready

**Keep the backend local** until the application is **completely ready**. Run the API with `npm run server` (or `node server/index.js`) from `kids-investment-app-import`; the React client uses `http://localhost:3003` by default when **REACT_APP_API_URL** is not set. Deploy to Render and set **api.minipyg.com** only when you are ready for production.

---

## 1. Backend is live at api.minipyg.com (when you deploy)

- Ensure the API is deployed on Render and **api.minipyg.com** is set and verified (see [DEPLOY_BACKEND_RENDER.md](DEPLOY_BACKEND_RENDER.md)).
- Test: open **https://api.minipyg.com/api/education/lessons** in a browser; you should get JSON (e.g. lessons array).

---

## 2. Set API URL in the frontend (React app)

The React client uses **REACT_APP_API_URL** for all API calls (Login, Dashboard, Portfolio, Education, Parent). It falls back to `http://localhost:3003` if not set.

**Where the React app is built (e.g. Vercel):**

1. Open your **Vercel** project (the one that builds the React app, if you have a separate one for the client, or the same project if you build `client/` there).
2. Go to **Settings** → **Environment Variables**.
3. Add:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://api.minipyg.com`
   - **Environment:** Production (and Preview if you want).
4. Save.
5. **Redeploy** the frontend (Deployments → … → Redeploy) so the new build picks up the variable.

**If you build the React app locally and then deploy static files:**

- Before building, set in terminal:  
  `set REACT_APP_API_URL=https://api.minipyg.com` (Windows) or  
  `export REACT_APP_API_URL=https://api.minipyg.com` (Mac/Linux)  
  Then run `npm run build` in the `client/` folder. Deploy the `client/build` output.

---

## 3. CORS on the backend

The backend (kids-investment-app-import/server) already uses **cors** with `origin: "*"`, so **minipyg.com** can call **api.minipyg.com** without extra CORS config. No change needed unless you want to restrict origins later.

---

## 4. Where is the React app served?

Right now **minipyg.com** (Vercel) is set up to serve **static** files (landing-page.html, minipyg-video.html, etc.) with **Output Directory** = `.` and no React build.

To have the **React app** (login, dashboard, portfolio, education) live on minipyg.com you can:

**Option A – Same Vercel project, two “modes”**

- Build the React app and serve it from a subpath, e.g. **minipyg.com/app**:
  - In Vercel: set **Build Command** to `cd client && npm install && npm run build`, **Output Directory** to `client/build`.
  - Add a rewrite so `/app` (and `/app/*`) serves `client/build/index.html` (see [PUBLISH_VERCEL.md](PUBLISH_VERCEL.md) for rewrites).  
  Then set **REACT_APP_API_URL** in Vercel env as in step 2 and redeploy.

**Option B – Separate Vercel project for the React app**

- Create a second Vercel project that uses **Root Directory** = `kids-investment-app-import/client`, **Build Command** = `npm install && npm run build`, **Output Directory** = `build`.
- Set **REACT_APP_API_URL** = `https://api.minipyg.com` in that project’s env.
- Either:
  - Use a subdomain (e.g. **app.minipyg.com**), or  
  - Use a path on the same domain (e.g. minipyg.com/app) by putting the static site behind the same domain with rewrites/proxy (more setup).

**Option C – Keep current static site only**

- If you only need the **landing page** and **MiniPyg video** on minipyg.com (no React app in production), you don’t need to build the client. The backend (api.minipyg.com) is still available for future use or for the React app when you deploy it.

---

## 5. Landing page redirect after signup

**landing-page.html** is updated so that after signup:

- On **localhost** it redirects to `http://localhost:3000` (your local React app).
- On **minipyg.com** it redirects to **minipyg.com/app** (so when you serve the React app at `/app`, the redirect works). If you use a different URL for the app (e.g. app.minipyg.com), change the redirect in `landing-page.html` to that URL.

---

## 6. Checklist

| Step | Action |
|------|--------|
| 1 | Backend live at **https://api.minipyg.com** (Render + DNS) |
| 2 | In frontend build (e.g. Vercel): set **REACT_APP_API_URL** = `https://api.minipyg.com` |
| 3 | Redeploy frontend so the new env is used |
| 4 | (Optional) Deploy React app to minipyg.com (e.g. at /app or app.minipyg.com) |
| 5 | Test: open the app, log in or register; requests should go to api.minipyg.com |

---

## 7. Quick test

- **Backend:**  
  `curl https://api.minipyg.com/api/education/lessons`
- **Frontend:**  
  Open your app, open DevTools → Network, log in or load dashboard; requests should show **https://api.minipyg.com/api/...**.

Once **REACT_APP_API_URL** is set and the frontend is redeployed, the frontend and backend are connected.
