# GUAES sign-up site — setup

Five files:
- `index.html` — landing page: "Choose your path" (Member / Contributor)
- `member.html` — links to SRC sign-up + Discord
- `contribute.html` — the contributor application form
- `apps-script.gs` — writes contributor form responses into a Google Sheet, free, no server needed
- `logo-v2.png` — the GUAES logo image used in all three page headers

## 1. Create the response sheet
1. Go to sheets.google.com > New spreadsheet. Name it e.g. "GUAES Sign Ups".
2. Extensions > Apps Script.
3. Delete the placeholder code, paste in the contents of `apps-script.gs`.
4. Save (Ctrl+S), name the project "GUAES signup handler".

## 2. Deploy it as a web app
1. In the Apps Script editor: Deploy > New deployment.
2. Click the gear next to "Select type" > Web app.
3. Description: anything. Execute as: **Me**. Who has access: **Anyone**.
4. Click Deploy, authorize it with your Google account (you'll see an "unverified app" warning — click Advanced > Go to project, this is normal for your own script).
5. Copy the **Web app URL** (ends in `/exec`).

## 3. Connect the form
1. Open `contribute.html`, find the line:
   ```
   const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
   ```
2. Replace with the URL you copied, commit, and push.

## 4. Turn on GitHub Pages
This repo already has `index.html` at the root, so:
1. On github.com, open this repo > **Settings > Pages**.
2. Under "Build and deployment", Source: **Deploy from a branch**.
3. Branch: **main**, folder **/ (root)** > **Save**.
4. Wait about a minute — the live URL appears at the top of the same Pages settings page, e.g. `https://mntindiw1.github.io/GUAES-freshers-signup/`.

## 5. Generate the QR code
Any QR generator (e.g. qr-code-generator.com) pointed at that GitHub Pages URL (the landing page). Test it on your phone before printing.

## How the pages link together
- `index.html` → **Member** goes to `member.html`; **Contributor** goes to `contribute.html`.
- `member.html` → both buttons open in a new tab: the SRC sign-up page and the Discord invite.
- `contribute.html` → the form itself; on success, also shows a Discord link.
- Each of `member.html` and `contribute.html` has a small "← Back" link to `index.html`.

## Updating the site later
Edit the relevant `.html` file, commit, and push — GitHub Pages redeploys automatically within a minute or two. If you add/remove fields on the contributor form, also update the `headers` array and field list in `apps-script.gs`.

If you ever replace the logo image, give the new file a different filename (e.g. `logo-v3.png`) rather than overwriting `logo-v2.png`, and update the `src` in all three HTML files — reusing the same filename can leave browsers/GitHub's CDN showing a stale cached copy for a while.

## Notes
- Responses land in the sheet in real time — anyone with edit access to the sheet can read them, export to CSV, filter, etc.
- The contributor form has a hidden honeypot field for basic spam filtering.
- Font requested was Neue Haas Grotesk — it's a commercial font not available via free web font services, so the CSS falls back to Helvetica/Arial, which are visually close. If GUAES has a licensed webfont file (`.woff2`), it can be added via `@font-face` in each page.
