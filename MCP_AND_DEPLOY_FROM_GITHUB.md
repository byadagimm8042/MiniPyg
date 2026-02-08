# MCP Server Setup + Deploy Code from GitHub

Two separate things:

1. **MCP server** — extends Cursor with tools (e.g. read your GitHub repo, issues, PRs). It does **not** deploy your app by itself.
2. **Deploy from GitHub** — connect your GitHub repo to a host (Vercel, Netlify). Every push to `main` can auto-deploy.

---

## Part 1: Install and use an MCP server in Cursor

An MCP (Model Context Protocol) server gives Cursor extra tools. A **GitHub MCP** lets the AI work with your repo (files, issues, PRs) from inside Cursor.

### Step 1: Get a GitHub Personal Access Token

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. **Generate new token (classic)**.
3. Name it (e.g. `Cursor MCP`), choose expiry, check **repo** (and **read:org** if you use private orgs).
4. Generate and **copy the token** (you won’t see it again).

### Step 2: Configure MCP in Cursor

**Option A — Project-level (this repo)**

A file `.cursor/mcp.json` is in this project. Edit it and replace the placeholder with your token:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

**Option B — User-level (all projects)**

1. In Cursor: **File** → **Preferences** → **Cursor Settings** (or **Ctrl+,**).
2. Search for **MCP** or open **Features** → **MCP**.
3. Add a server. Example for GitHub:

- **Name:** `github`
- **Command:** `npx`
- **Args:** `-y`, `@modelcontextprotocol/server-github`
- **Env:** `GITHUB_PERSONAL_ACCESS_TOKEN` = your token

(Exact labels may vary; use “Add MCP server” and fill in command/args/env.)

### Step 3: Install Node.js dependency (if needed)

The GitHub MCP runs via `npx`. Ensure Node.js is installed (`node --version`). The first time Cursor uses the MCP it will run `npx -y @modelcontextprotocol/server-github`, which may download the package.

### Step 4: Restart Cursor

Restart Cursor so it picks up the MCP config. After that, the AI can use GitHub tools (e.g. “list my repos”, “open issue X”) if the MCP is enabled.

---

## Part 2: Deploy the code you pushed on GitHub

Deployment is done by connecting your **GitHub repository** to a hosting provider. No MCP is required for this.

### Option A: Vercel (good for React/Node)

1. Go to [https://vercel.com](https://vercel.com) and sign in (e.g. with GitHub).
2. **Add New** → **Project**.
3. **Import** your GitHub repo (e.g. `kids-investment-app`).
4. Vercel will detect the app. For a **landing-only** or **Vite/React** app:
   - **Build command:** `npm run build`
   - **Output directory:** `dist` (or whatever your app uses).
5. Click **Deploy**. Future pushes to `main` will trigger new deploys.

### Option B: Netlify

1. Go to [https://app.netlify.com](https://app.netlify.com) and sign in with GitHub.
2. **Add new site** → **Import an existing project** → **GitHub**.
3. Choose your repo (e.g. `kids-investment-app`).
4. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. **Deploy**. Pushes to `main` will auto-deploy.

### Option C: GitHub Actions (e.g. deploy to GitHub Pages or your own server)

You can add a workflow under `.github/workflows/` that runs on push and deploys (e.g. build then upload to GitHub Pages or to a server). If you tell me which target you want (Pages, Vercel, Netlify, or your own server), I can write the workflow.

---

## Summary

| Goal                         | What to do                                                                 |
|-----------------------------|----------------------------------------------------------------------------|
| Use GitHub from Cursor (MCP)| Add GitHub MCP in `.cursor/mcp.json` or Cursor Settings; add token; restart. |
| Deploy the code on GitHub   | Connect the repo to Vercel or Netlify (or use GitHub Actions). No MCP needed. |

If you tell me which repo you pushed (e.g. `kids-investment-app`) and whether it’s the **Vite/React landing page** or the **Node + client app**, I can give exact build/output settings for Vercel or Netlify.
