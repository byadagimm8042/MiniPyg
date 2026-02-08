# kids-investment-app

Imported from `C:\Users\roopa\kids-investment-app`. KidsFinance — teaching financial literacy through games, parent dashboard, and mock investing.

## Setup

1. **Install dependencies** (root and client):

   ```bash
   npm install
   cd client && npm install && cd ..
   ```

2. **Environment** (optional): Copy `.env.example` to `.env` and set `MONGODB_URI`, `JWT_SECRET`, `PORT` if you use a database. The app runs without MongoDB using in-memory fallbacks for demo.

3. **Run the app**:

   - **Option A:** `npm run dev` (server + client with concurrently)
   - **Option B:** Double-click `run-app.bat` (Windows — opens Server and Client in separate windows)
   - **Option C:** Terminal 1: `node server/index.js` — Terminal 2: `cd client && npm start`

4. **URLs**:
   - Main app (React): http://localhost:3000  
   - API server: http://localhost:3003  
   - Landing only: `node server-landing.js` then http://localhost:8080  

## Structure

- `client/` — React app (login, dashboard, portfolio, education, parent dashboard)
- `server/` — Express API (auth, portfolio, education, parent), MongoDB, Socket.io
- `landing-page.html`, `index.html` — Static landing pages
- `business-game.html`, `home-chores-game.html`, `minipyg-video.html` — Embedded games / demo
