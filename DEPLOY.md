# Deploying to Vercel with a shared database

The dashboard saves every edit to a shared Neon Postgres database when deployed
on Vercel. Everyone who opens the URL sees and edits the same data. If the
database isn't connected (or you open the file locally), it falls back to
browser localStorage automatically — check the badge in the top-right corner:
**Shared · Synced** vs **Local Only**.

## Project files

```
index.html      — the dashboard (frontend)
api/state.js    — serverless function: GET loads state, POST saves it
package.json    — declares the Neon database driver
```

## Steps

1. **Push these files to your GitHub repo** (squad-rivals-dashboard).

2. **Import the repo into Vercel**
   - Go to https://vercel.com/new
   - Select the repo, leave all build settings as default (no framework), Deploy.

3. **Add the database**
   - In your Vercel project: **Storage** tab → **Create Database** → **Neon (Postgres)**
   - Accept the defaults (free plan is fine) and connect it to the project.
   - This automatically adds the `DATABASE_URL` environment variable.

4. **Redeploy** (Deployments tab → ⋯ → Redeploy) so the function picks up the
   new environment variable.

5. Open your URL. The badge should read **Shared · Synced**. The table is
   created automatically on first request — no manual schema setup needed.

## Notes

- **Anyone with the URL can edit the shared state.** Fine for an internal
  planning tool; add Vercel password protection (project Settings →
  Deployment Protection) or simple auth if you need to lock it down.
- "Reset to Defaults" resets the shared state for everyone (after a confirm).
- Last write wins — if two people drag sliders simultaneously, the most
  recent save is kept.
