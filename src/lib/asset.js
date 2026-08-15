// Resolve a path to a file in /public against Vite's configured base URL.
// On a GitHub Pages project site the app is served under /Darshan/, so a bare
// "/darshan.png" would 404. asset('darshan.png') -> "/Darshan/darshan.png".
// import.meta.env.BASE_URL is inlined at build time (it is the `base` in
// vite.config.js), so this stays a plain string constant.
export const asset = (p) => `${import.meta.env.BASE_URL}${String(p).replace(/^\/+/, '')}`;
