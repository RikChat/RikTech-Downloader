import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'node-fetch'

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try{
    const url = req.query.url || req.body?.url
    if(!url) return res.status(400).json({ error: 'Missing url parameter' })
    const upstream = 'https://api.ryzumi.vip/api/downloader/igdl?url=' + encodeURIComponent(String(url))
    const r = await fetch(upstream, { method: 'GET' })
    const text = await r.text()
    // try to parse JSON, otherwise return as text
    try{ 
      const json = JSON.parse(text)
      return res.status(200).json(json)
    }catch(e){
      return res.status(200).json({ data: text })
    }
  }catch(e:any){
    return res.status(500).json({ error: String(e.message || e) })
  }
}
