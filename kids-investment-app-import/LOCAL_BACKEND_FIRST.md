# Keep backend local until app is ready

Use the **backend locally** until the application is **completely ready**. Deploy to Render (api.minipyg.com) only when you are ready for production.

---

## Local development

1. **Backend:** From `kids-investment-app-import` run:
   - `node server/index.js` or `npm run server`
   - API runs at **http://localhost:3003**
2. **Frontend (React):** From `kids-investment-app-import` run:
   - `cd client && npm start`
   - App runs at **http://localhost:3000**
3. **API URL:** Do **not** set `REACT_APP_API_URL` locally — the client falls back to `http://localhost:3003`, so it talks to your local backend.

---

## When the app is ready for production

1. Deploy the backend to **Render** and add **api.minipyg.com** (see [DEPLOY_BACKEND_RENDER.md](DEPLOY_BACKEND_RENDER.md)).
2. Set **REACT_APP_API_URL** = `https://api.minipyg.com` where the frontend is built (e.g. Vercel) and redeploy (see [CONNECT_FRONTEND_BACKEND.md](CONNECT_FRONTEND_BACKEND.md)).

Until then, keep the backend local.
