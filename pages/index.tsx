import { useState } from 'react'
import Head from 'next/head'
import BottomNav from '../components/BottomNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faYoutube, faTwitter, faPinterest, faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import ResultCard from '../components/ResultCard'
import { useRouter } from 'next/router'

const tools = [
  { id: 'tiktok', name: 'TikTok', icon: faTiktok, placeholder: 'https://www.tiktok.com/@.../video/...' },
  { id: 'yt', name: 'YouTube', icon: faYoutube, placeholder: 'https://youtu.be/...' },
  { id: 'ig', name: 'Instagram', icon: faInstagram, placeholder: 'https://www.instagram.com/p/...' },
  { id: 'facebook', name: 'Facebook', icon: faFacebook, placeholder: 'https://www.facebook.com/.../videos/...' },
  { id: 'pinterest', name: 'Pinterest', icon: faPinterest, placeholder: 'https://www.pinterest.com/pin/...' },
  { id: 'twitter', name: 'Twitter', icon: faTwitter, placeholder: 'https://twitter.com/.../status/...' },
  { id: 'spotify', name: 'Spotify', icon: faSpotify, placeholder: 'https://open.spotify.com/track/...' },
  { id: 'soundcloud', name: 'SoundCloud', icon: faSoundcloud, placeholder: 'https://soundcloud.com/...'}
]

export default function Home() {
  const [url, setUrl] = useState('')
  const [selected, setSelected] = useState(tools[0].id)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleDownload = async () => {
    setError('')
    setResult(null)
    if (!url) { setError('Masukkan URL'); return }
    setLoading(true)
    try {
      const res = await axios.get(`/api/download?service=${selected}&url=${encodeURIComponent(url)}`)
      setResult(res.data)
    } catch (e: any) {
      setError(e?.response?.data?.message || e.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Medsos Downloader</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col">
        <div className="container mx-auto px-4 pt-8 pb-24">
          <h1 className="text-2xl font-bold text-center mb-2">Medsos Downloader</h1>
          <p className="text-center text-sm text-gray-600 mb-6">Design inspired by fsmvid.com — built with Next.js + TypeScript</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {tools.map(t => (
              <button key={t.id} onClick={() => setSelected(t.id)}
                className={`flex items-center gap-3 p-4 rounded-lg border ${selected===t.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}>
                <div className="text-2xl"><FontAwesomeIcon icon={t.icon} /></div>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.placeholder}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 shadow">
            <label className="block text-sm font-medium mb-2">URL</label>
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Masukkan link video atau audio" className="w-full p-3 border rounded mb-3" />
            <div className="flex gap-2">
              <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded shadow">
                <FontAwesomeIcon icon={faDownload} /> {loading ? 'Memproses...' : 'Proses'}
              </button>
              <button onClick={()=>{setUrl(''); setResult(null); setError('')}} className="px-4 py-2 border rounded">Clear</button>
            </div>

            {error && <div className="mt-4 text-red-600">{error}</div>}

            {result && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Hasil</h3>
                <div className="space-y-3">
                  {/* If API returns files array show first quick card */}
                  {Array.isArray(result.files) && result.files.length>0 ? (
                    <ResultCard service={selected} url={url} title={result.title || result.files[0].quality || selected} subtitle={result.files[0].size || ''} />
                  ) : (
                    <ResultCard service={selected} url={url} title={result.title || selected} subtitle={result.filename || ''} />
                  )}

                  <div className="text-xs text-gray-500">Klik hasil untuk membuka halaman detail dan pilihan download.</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-500">
            <strong>Info Pengembang:</strong>
            <div>Nama: (Masukkan nama Anda)</div>
            <div>Email: (Masukkan email Anda)</div>
          </div>
        </div>

        <BottomNav />
      </main>
    </>
  )
}