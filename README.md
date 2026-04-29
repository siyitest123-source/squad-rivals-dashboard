# Socios Squad Rivals — Revenue Model Dashboard

Interactive economy sandbox for the Squad Rivals product. Adjust pricing, conversion rates, CHZ price, and WAU. Watch the model recompute in real time.

## What's in here

- **`index.html`** — Single-file dashboard. No build step, no dependencies to install. Just open it.

## Quick start (local)

```bash
# Just open the file in a browser
open index.html
# or on Linux
xdg-open index.html
```

Or if you want to serve it locally (recommended if you'll iterate):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## How the model works

Revenue is computed bottom-up:

1. **Activation revenue** = `WAU × activation_rate × avg_slots × slot_price_CHZ × CHZ_USD`
2. **Flexibility revenue** = `WAU × flex_rate × 3 purchases/wk × ticket_price_CHZ × CHZ_USD`
3. **Assistant Manager** = `WAU × AM_rate × AM_price_CHZ × CHZ_USD`
4. **Tactic unlocks** = `WAU × 5% × 25 CHZ × CHZ_USD` (steady-state assumption)

Annual gross = weekly × 52. Allocation split:

| Bucket | Share | Purpose |
|---|---|---|
| Reward Pool | 40% | Performance packs, Reward Points, vouchers |
| Platform | 25% | Sustainable team income |
| Buyback & Burn | 15% | Fan Token supply pressure |
| Treasury Reserve | 10% | Variance smoothing |
| Acquisition | 10% | Growth incentives, referrals |

## Scenarios

Three preset scenarios are baked in:

- **Base** — 50K WAU, $0.05 CHZ, 40% activation rate
- **Bear** — 15K WAU, $0.03 CHZ, lower conversion
- **Bull** — 200K WAU, $0.12 CHZ, higher conversion

Reset to defaults any time via the button at the bottom of the input panel.

## Pushing to GitHub

```bash
# 1. From this folder, init git
git init
git add .
git commit -m "Initial commit: Squad Rivals revenue dashboard"

# 2. Create a new repo on github.com (private if you want)
#    Don't add a README on GitHub — we already have one here

# 3. Connect and push (replace YOUR-USERNAME and REPO-NAME)
git remote add origin https://github.com/YOUR-USERNAME/REPO-NAME.git
git branch -M main
git push -u origin main
```

## Sharing with teammates

Three options, easiest to most polished:

### Option 1 — Just send the file
Email or Slack the `index.html` file. They open it. Done.

### Option 2 — GitHub Pages (free hosted URL)
After pushing to GitHub:
1. Go to your repo → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **main** branch and **/ (root)** folder
4. Save. After ~1 minute you'll get a URL like `https://YOUR-USERNAME.github.io/REPO-NAME/`
5. Share that URL with your team

### Option 3 — Private repo + Pages
Same as above, but if your repo is private you need GitHub Pro for Pages access. Or just keep the repo public — there's nothing sensitive in this dashboard.

## Editing the model

All inputs and assumptions live in the `<script>` block near the top of `index.html`:

- **`defaults`** object — change baseline values
- **`scenarios`** object — adjust the three preset scenarios
- **`compute()`** function — change the revenue formulas themselves

Common edits:

- Want to add a new revenue stream? Add it inside `compute()`, then add a row in `renderBreakdown()` and a slice in the mix chart.
- Want to change the allocation split? Edit the percentages in `compute()` (the `0.40`, `0.25`, etc. lines) and update `renderAllocation()`.
- Want different sensitivity chart points? Edit `wauPoints` and `chzPoints` arrays in `renderCharts()`.

## Caveats

This is a planning model, not a forecast. Outputs are only as good as the inputs — conversion rates especially are educated guesses until you have real cohort data. Use it to pressure-test pricing decisions and to align the team on rough revenue scale, not to commit to specific numbers.

---

*v0.1 · Internal working draft · Built for the Socios Squad Rivals planning effort*
