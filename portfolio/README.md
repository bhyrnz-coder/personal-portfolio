# Renz Anthony Buhay — Portfolio

A Next.js portfolio with a scrapbook-style profile card (sticky sidebar) and
a bento-grid work gallery with a Videos / Graphics toggle. Clicking a video
tile opens a popup player embedding YouTube/Vimeo.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize the content

| What | Where |
|---|---|
| Your photo | `components/ProfileSidebar.js` — replace the placeholder box with an `<img>` pointing at a photo in `public/` |
| Name, bio, proficiency badges | `components/ProfileSidebar.js` |
| CV file | Replace `public/resume.pdf` with your real CV (same filename), or rename and update the link in `ProfileSidebar.js` |
| Videos | `components/WorkGallery.js` — the `VIDEOS` array. Set `embedUrl` to a YouTube/Vimeo **embed** link, e.g. `https://www.youtube.com/embed/VIDEO_ID` (not the regular watch link) |
| Graphics (Figma exports) | `components/WorkGallery.js` — the `GRAPHICS` array. Set `src` to an image path in `public/`, e.g. `/graphics/onboarding.png` |
| Contact email | `components/Footer.js` |

### Getting a YouTube embed URL
Open the video on YouTube → **Share** → **Embed** → copy the URL inside
`src="..."` in the embed code they give you. It looks like:
`https://www.youtube.com/embed/dQw4w9WgXcQ`

### Adding your Figma exports
Export frames from Figma as PNG/JPG (right-click frame → Export), drop them
into a `public/graphics/` folder, then reference them as `/graphics/filename.png`
in the `GRAPHICS` array.

## Deploy to GitHub + Vercel

1. **Push to GitHub**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the GitHub repo you just pushed
   - Framework preset auto-detects as **Next.js** — no config needed
   - Click **Deploy**

   Every push to `main` auto-deploys after that.

## Project structure

```
app/
  layout.js          — fonts (Caveat handwritten + Inter), metadata
  page.js             — assembles sidebar + gallery + footer
  globals.css         — torn-paper edge, ring holes, dark theme utilities
components/
  ProfileSidebar.js   — sticky scrapbook card: photo, bio, skills, CV link
  WorkGallery.js       — Videos/Graphics toggle + bento grid
  VideoLightbox.js     — popup player for embedded videos
  Footer.js            — contact section
public/
  resume.pdf           — placeholder, replace with your real CV
```
