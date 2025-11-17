import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

const MAP:any = {
  facebook: process.env.NEXT_PUBLIC_API_FACEBOOK || 'https://api.ryzumi.vip/api/downloader/fbdl?url=',
  instagram: process.env.NEXT_PUBLIC_API_INSTAGRAM || 'https://api.ryzumi.vip/api/downloader/igdl?url=',
  pinterest: process.env.NEXT_PUBLIC_API_PINTEREST || 'https://api.ryzumi.vip/api/downloader/pinterest?url=',
  tiktok: process.env.NEXT_PUBLIC_API_TIKTOK || 'https://api.ryzumi.vip/api/downloader/v2/ttdl?url=',
  youtube: process.env.NEXT_PUBLIC_API_YT || 'https://api.ryzumi.vip/api/downloader/ytmp3?url=',
  videy: process.env.NEXT_PUBLIC_API_VIDEY || 'https://api.ryzumi.vip/api/downloader/videy?url=',
  twitter: process.env.NEXT_PUBLIC_API_TWITTER || 'https://api.ryzumi.vip/api/downloader/v2/twitter?url=',
  spotify: process.env.NEXT_PUBLIC_API_SPOTIFY || 'https://api.ryzumi.vip/api/downloader/spotify?url=',
  soundcloud: process.env.NEXT_PUBLIC_API_SOUNDCLOUD || 'https://api.ryzumi.vip/api/downloader/soundcloud?url='
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const { platform } = req.query
  const url = req.query.url || req.body?.url
  if(!platform || !url) return res.status(400).json({ error: 'Missing platform or url' })
  const p = String(platform)
  const upstream = MAP[p]
  if(!upstream) return res.status(400).json({ error: 'Unknown platform' })
  try{
    const r = await fetch(upstream + encodeURIComponent(String(url)))
    const text = await r.text()
    try{ return res.status(200).json(JSON.parse(text)) }catch(e){ return res.status(200).json({ data: text }) }
  }catch(e:any){
    return res.status(500).json({ error: String(e.message || e) })
  }
}
