# RikTech Downloader — Full (with proxy, PWA, dark mode, splash)

This project is a Next.js + TypeScript web application intended to be deployed to Vercel.
Features included:
- Serverless proxy API routes (pages/api/*) to avoid CORS when calling external downloader APIs.
- Claymorphism-inspired UI and mini-Instagram-like bottom navigation.
- Splash screen animation on initial load.
- Dark / Light mode toggle saved to localStorage.
- PWA manifest and basic service worker registration.
- Developer info page and tools list.
- Uses FontAwesome via CDN for icons.

**How to use**
1. Copy `.env.local.example` to `.env.local` and adjust if needed.
2. `npm install`
3. `npm run dev`

**Notes**
- The proxy routes forward the `url` query parameter to the external endpoints you provided.
- Some upstream endpoints might require API keys or may have rate limits.
