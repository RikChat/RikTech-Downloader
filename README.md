# Medsos Downloader (Next.js + TypeScript)

**What**: A social media downloader frontend inspired by fsmvid.com. Uses a serverless proxy (`/api/download`) to forward requests to the provided Ryzumi VIP APIs. Put your API key in `.env.local` as `RYZUMI_API_KEY` if required.

**Deploy**: Works on Vercel. Build command: `npm run build`. Set environment variables in the Vercel dashboard if needed.

**Notes**:
- The UI uses FontAwesome icons.
- Edit developer info in `pages/index.tsx`.