import { useEffect, useState } from 'react'
import Link from 'next/link'

type Tool = { id:string, name:string, icon:string, api:string, placeholder?:string }

const TOOLS: Tool[] = [
  { id:'tiktok', name:'TikTok', icon:'fa-brands fa-tiktok', api:'/api/tiktok?url=', placeholder:'https://www.tiktok.com/...' },
  { id:'youtube', name:'YouTube', icon:'fa-brands fa-youtube', api:'/api/youtube?url=', placeholder:'https://youtu.be/...' },
  { id:'instagram', name:'Instagram', icon:'fa-brands fa-instagram', api:'/api/instagram?url=' },
  { id:'facebook', name:'Facebook', icon:'fa-brands fa-facebook', api:'/api/facebook?url=' },
  { id:'pinterest', name:'Pinterest', icon:'fa-brands fa-pinterest', api:'/api/pinterest?url=' },
  { id:'twitter', name:'Twitter', icon:'fa-brands fa-x-twitter', api:'/api/twitter?url=' },
  { id:'spotify', name:'Spotify', icon:'fa-brands fa-spotify', api:'/api/spotify?url=' },
  { id:'soundcloud', name:'SoundCloud', icon:'fa-brands fa-soundcloud', api:'/api/soundcloud?url=' },
  { id:'videy', name:'Videy', icon:'fa-solid fa-film', api:'/api/videy?url=' },
]

export default function Home(){
  const [showSplash, setShowSplash] = useState(true)
  const [selected, setSelected] = useState<Tool>(TOOLS[0])
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(()=>{
    const theme = localStorage.getItem('theme')
    if(theme === 'dark'){ setDark(true); document.documentElement.classList.add('dark') }
    const t = setTimeout(()=> setShowSplash(false), 1300)
    return ()=> clearTimeout(t)
  },[])

  const toggleTheme = ()=>{
    setDark(v=>!v)
    if(!dark) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', (!dark) ? 'dark' : 'light')
  }

  const doDownload = async ()=>{
    if(!input){ setResult('Masukkan URL terlebih dahulu'); return }
    setLoading(true); setResult(null)
    try{
      const endpoint = selected.api + encodeURIComponent(input)
      const res = await fetch(endpoint)
      if(!res.ok) throw new Error('HTTP ' + res.status)
      const data = await res.json()
      // try common fields
      const candidates = ['url','download','result','data','link','video','file','source']
      function deepSearch(obj:any): any{
        if(!obj) return null
        if(typeof obj === 'string') return obj
        if(typeof obj === 'object'){
          for(const k of Object.keys(obj)){
            if(candidates.includes(k.toLowerCase())) return obj[k]
          }
          for(const k of Object.keys(obj)){
            const v = obj[k]
            if(typeof v === 'string') return v
            if(typeof v === 'object'){ const s = deepSearch(v); if(s) return s }
          }
        }
        return null
      }
      const found = deepSearch(data) || JSON.stringify(data)
      setResult(typeof found === 'string' ? found : JSON.stringify(found))
    }catch(e:any){
      setResult(String(e.message || e))
    }finally{ setLoading(false) }
  }

  return <>
    {showSplash && <div className="splash"><div className="brand">RikTech — Downloader</div></div>}
    <div className="container">
      <div className="header">
        <div className="logo"><i className="fa fa-download"></i></div>
        <div style={{flex:1}}>
          <div className="title">RikTech Downloader</div>
          <div className="subtitle">Unduh media dari banyak platform</div>
        </div>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <button className="btn" onClick={toggleTheme}><i className="fa fa-moon"></i></button>
          <Link href="/info"><a className="btn" style={{background:'#fff',color:'#111',padding:'8px 10px',borderRadius:10}}>Info</a></Link>
        </div>
      </div>

      <div className="grid" role="list">
        {TOOLS.map(t=>(
          <div key={t.id} className="card" onClick={()=>setSelected(t)} aria-label={t.name}>
            <i className={t.icon}></i>
            <div className="label">{t.name}</div>
          </div>
        ))}
      </div>

      <div className="tools-panel">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontWeight:700}}>{selected.name} Downloader</div>
          <div style={{fontSize:12,color:'var(--muted)'}}>Tempel URL lalu tekan Unduh</div>
        </div>
        <div className="input-row">
          <input placeholder={selected.placeholder || 'Tempel URL di sini'} value={input} onChange={(e)=>setInput(e.target.value)} />
          <button className="btn" onClick={doDownload} disabled={loading}>{loading? 'Memproses...':'Unduh'}</button>
        </div>

        {result && <div className="result">Hasil: <a href={result} target="_blank" rel="noreferrer">{result}</a></div>}
        {!result && <div className="result">Hasil akan muncul setelah unduhan berhasil.</div>}

        <div className="footer">
          <div>Developer: RikTech — versi 1.2</div>
          <div style={{marginTop:6}}>Jika fetch gagal karena CORS, serverless proxy sudah diaktifkan — API dipanggil melalui route /api/[tool]</div>
        </div>
      </div>

    </div>

    <nav className="bottom-nav" role="navigation">
      <a className="nav-item" href="#"><i className="fa fa-home"></i><div>Home</div></a>
      <a className="nav-item" href="#"><i className="fa fa-download"></i><div>Downloads</div></a>
      <a className="nav-item" href="/info"><i className="fa fa-info-circle"></i><div>Info</div></a>
      <a className="nav-item" href="#"><i className="fa fa-cog"></i><div>Settings</div></a>
    </nav>
  </>
}
