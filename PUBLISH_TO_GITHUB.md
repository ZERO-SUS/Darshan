# Publishing this site to GitHub Pages

This folder is a GitHub-Pages-ready copy of the portfolio. It builds with Vite
and deploys automatically via GitHub Actions.

## This project is configured for a PROJECT site

- Repo: **https://github.com/ZERO-SUS/Darshan**
- Live URL: **https://zero-sus.github.io/Darshan/**
- `vite.config.js` → `base: '/Darshan/'`
- `public/404.html` → `pathSegmentsToKeep = 1`
- `src/App.jsx` → `<Router basename={import.meta.env.BASE_URL}>`

If you ever rename the repo, update `base` in `vite.config.js` to
`/<new-repo-name>/` (keep the leading and trailing slash, and match the exact
capitalisation of the repo name — GitHub Pages paths are case-sensitive).

## Push it

```bash
cd E:\GITHUB_DARSHAN
git init
git add .
git commit -m "Portfolio: GitHub Pages project-site deploy"
git branch -M main
git remote add origin https://github.com/ZERO-SUS/Darshan.git
git push -u origin main
```

Then on GitHub: **Settings → Pages → Build and deployment → Source = GitHub Actions**.
Wait for the "Deploy to GitHub Pages" workflow to finish (Actions tab). Done.

## Test the build locally

```bash
npm install
npm run build
npm run preview   # serves at http://localhost:4173/Darshan/
```

## Notes

- **Routing:** GitHub Pages is a static host, so deep links / refresh are handled
  by `public/404.html` + a small script in `index.html` (the standard
  spa-github-pages trick). Clean URLs like `/Darshan/projects` work.
- **Assets:** files in `public/` are referenced through the `asset()` helper in
  `src/lib/asset.js`, which prefixes Vite's `base` so images/PDF resolve under
  `/Darshan/`. Don't hardcode `/foo.png` in JSX — use `asset('foo.png')`.
- **Blog / Admin:** these use Firebase directly from the browser, so they work on
  Pages. The `api/` folder and `vercel.json` are Vercel-only and are ignored by
  GitHub Pages.
