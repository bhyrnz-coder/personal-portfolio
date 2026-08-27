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
| Profile card design | Design the whole card yourself (photo, name, bio, skills, CV button all baked in) and export as one PNG — see "Profile card image" below |
| CV file | Replace `public/resume.pdf` with your real CV (same filename), or rename and update the link in `ProfileSidebar.js` |

### Profile card image

Design the entire sidebar card yourself (in Figma, Canva, whatever) and
export it as a single image:

- **Width:** 640px (2x, so it's crisp on retina screens)
- **Height:** whatever fits your content, keep it proportional/portrait
- **Format:** PNG with a **transparent background** — needed so the torn
  paper edge and paperclip gaps show the dark page behind them, instead of
  a plain rectangle

Save the file as `public/profile-card.png` (or update the filename in
`components/ProfileSidebar.js`).

**Making the "View my CV" button clickable:** since the button is just
part of the flat image, `ProfileSidebar.js` places an invisible clickable
box on top of it. Open that file and adjust these four numbers until the
box lines up with your button in the image:

```js
style={{
  top: '88%',    // distance from top of image to top of your button
  left: '10%',   // distance from left edge to left of your button
  width: '55%',  // how wide your button is
  height: '6%',  // how tall your button is
}}
```

All four are percentages of the image's total width/height, so they stay
lined up correctly no matter what size the image displays at. Easiest way
to find the right numbers: open your design file, note the button's pixel
position and size, then divide by the full image's width/height and
multiply by 100.
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
