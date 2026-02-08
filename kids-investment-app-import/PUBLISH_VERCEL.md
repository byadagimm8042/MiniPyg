# Publish kids-investment-app to Vercel

Deploy the **kids-investment-app-import** project (landing page, MiniPyg video, games) to Vercel so it’s live on the web.

---

## Fix: "Could not read package.json" (ENOENT)

If the build fails with **ENOENT: no such file or directory, open '/vercel/path0/package.json'**, Vercel is building from the **repo root** instead of **kids-investment-app-import**.

**Fix:** In Vercel → **Project** → **Settings** → **General** → **Root Directory**: set to **`kids-investment-app-import`** and save. Then **Redeploy** (Deployments → … → Redeploy).

---

## 1. Connect GitHub to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in (use **Continue with GitHub**).
2. Click **Add New…** → **Project**.
3. **Import** the repo: **byadagimm8042/MiniPyg** (select it or paste the repo URL).

---

## 2. Set the root directory

1. In **Configure Project**, find **Root Directory**.
2. Click **Edit** and set it to: **kids-investment-app-import**.
3. Leave **Framework Preset** as **Other** (or **Vite** if you later add a build).

---

## 3. Static deploy (no build)

Use this if you only want the static HTML/CSS/JS (landing page, minipyg-video, games):

- **Build Command:** leave empty, or `echo "No build"`
- **Output Directory:** leave empty or `.`
- **Install Command:** leave empty

Click **Deploy**. Vercel will deploy the contents of `kids-investment-app-import` as static files.

- **Live URL:** `https://your-project-name.vercel.app`
- **`/`** → shows **landing-page.html** (via `vercel.json` rewrite)
- **`/minipyg-video.html`** → MiniPyg video (Play/Pause)
- **`/business-game.html`**, **`/home-chores-game.html`** → games

---

## 4. Optional: deploy the React app (client)

To build and serve the React app (login, dashboard, portfolio):

- **Root Directory:** `kids-investment-app-import`
- **Build Command:** `cd client && npm install && npm run build`
- **Output Directory:** `client/build`
- **Install Command:** leave empty (build runs install)

Then add rewrites in **kids-investment-app-import/vercel.json** for the React SPA, for example:

```json
{
  "rewrites": [
    { "source": "/", "destination": "/landing-page.html" },
    { "source": "/app/(.*)", "destination": "/client/build/index.html" }
  ]
}
```

(Adjust paths if you want `/` to serve the React app instead of the landing page.)

---

## 5. Custom domain (e.g. minipyg.com)

1. In Vercel: **Project** → **Settings** → **Domains**.
2. Add **minipyg.com** and **www.minipyg.com**.
3. In your domain registrar (e.g. GoDaddy), set DNS as Vercel instructs (A record for `@`, CNAME for `www` to `cname.vercel-dns.com`).

---

## Summary

| Step | Action |
|------|--------|
| 1 | Vercel → Add Project → Import **byadagimm8042/MiniPyg** |
| 2 | **Root Directory** = **kids-investment-app-import** |
| 3 | Build = empty, Output = empty (static deploy) → **Deploy** |
| 4 | Open `https://your-project.vercel.app` (root = landing page, `/minipyg-video.html` = video) |

The repo already has **kids-investment-app-import/vercel.json** so `/` serves **landing-page.html**. After you connect the repo and set the root directory, each push to `main` will trigger a new deploy.
