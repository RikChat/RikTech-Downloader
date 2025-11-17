import type { NextApiRequest, NextApiResponse } from 'next'

const MAP: Record<string,string> = {
  tiktok: 'https://api.ryzumi.vip/api/downloader/v2/ttdl?url=',
  yt: 'https://api.ryzumi.vip/api/downloader/ytmp3?url=',
  ig: 'https://api.ryzumi.vip/api/downloader/igdl?url=',
  facebook: 'https://api.ryzumi.vip/api/downloader/fbdl?url=',
  pinterest: 'https://api.ryzumi.vip/api/downloader/pinterest?url=',
  videy: 'https://api.ryzumi.vip/api/downloader/videy?url=',
  twitter: 'https://api.ryzumi.vip/api/downloader/v2/twitter?url=',
  spotify: 'https://api.ryzumi.vip/api/downloader/spotify?url=',
  soundcloud: 'https://api.ryzumi.vip/api/downloader/soundcloud?url='
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { service, url } = req.query
  if (!service || !url) return res.status(400).json({ message: 'Missing service or url' })
  const s = String(service)
  const mapped = MAP[s]
  if (!mapped) return res.status(400).json({ message: 'Unknown service' })

  const API_KEY = process.env.RYZUMI_API_KEY || ''

  try {
    const target = mapped + encodeURIComponent(String(url))
    const headers: Record<string,string> = {}
    if (API_KEY) headers['x-api-key'] = API_KEY

    const r = await fetch(target, { headers })
    const text = await r.text()
    let data = null
    try { data = JSON.parse(text) } catch(e) { data = { raw: text } }

    return res.status(200).json(data)
  } catch (err: any) {
    return res.status(500).json({ message: err?.message || 'Server error' })
  }
}