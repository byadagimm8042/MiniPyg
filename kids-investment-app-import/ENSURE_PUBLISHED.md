# How to Ensure Your Code Is Published

Two meanings of "published": **(1) on GitHub** and **(2) live on the web**.

---

## 1. Ensure code is on GitHub

### Check from your machine

In a terminal (in the project root):

```bash
git status
```

- **"Your branch is up to date with 'origin/main'"** → local `main` matches GitHub.
- **"Your branch is ahead of 'origin/main'"** → you have unpushed commits. Run:

```bash
git push origin main
```

### Check on the web

1. Open: **https://github.com/byadagimm8042/MiniPyg**
2. Confirm the latest commit message and time match what you just pushed.
3. Open **kids-investment-app-import/minipyg-video.html** in the repo and confirm your Play/Pause and other changes are there.

If you see your latest changes in that file on GitHub, the code **is** published to the repo.

---

## 2. Ensure the site is live (deployed)

If you use **Vercel** (e.g. mini-pyg.vercel.app) or **Netlify** connected to this repo:

- **Every push to `main`** usually triggers a new deploy.
- So: **push to `main`** (step 1) → wait a few minutes → your published code is what’s live.

### Check deployment

- **Vercel:** Dashboard → your project → **Deployments**. Latest deployment should show the commit you just pushed.
- **Netlify:** Site dashboard → **Deploys**. Same idea.

### See your change in real time

- **Root app (React landing):**  
  Open your live URL (e.g. **https://mini-pyg.vercel.app**).  
  That URL is built from the root app; it does **not** serve `kids-investment-app-import/minipyg-video.html` as a separate route unless you added one that points to it.

- **minipyg-video.html (Play/Pause, etc.):**  
  - If your live site has a page that **embeds** or **links to** that file (e.g. an iframe or a route that serves it), open that page and use Play/Pause to confirm the change.
  - If the only place that file is used is inside **kids-investment-app-import** (e.g. `landing-page.html` iframe), then to “see it live” you either:
    - Run **kids-investment-app-import** locally and open the page that loads the iframe (see **RUN_ON_LOCALHOST.md**), or  
    - Deploy **kids-investment-app-import** as its own app (e.g. second Vercel/Netlify project pointing at that folder or a subpath) and open the URL that serves the page with the iframe.

So: **code is published** = it’s on GitHub and (if you use Vercel/Netlify) the latest deploy uses that code. **Seeing the change in real time** = open the URL that actually serves the page containing `minipyg-video.html` (local or deployed).

---

## Quick checklist

| Step | Action |
|------|--------|
| 1 | `git push origin main` (if you had unpushed commits) |
| 2 | Open https://github.com/byadagimm8042/MiniPyg and confirm latest commit + file content |
| 3 | In Vercel/Netlify, confirm latest deploy matches that commit |
| 4 | Open the live URL that serves your app (or run locally) and test Play/Pause / minipyg-video |

Once 1–2 are done, your code **is** published to GitHub. Once 3–4 are done, you’ve confirmed it’s what’s running live and you can see the change in real time.
