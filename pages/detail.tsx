import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import BottomNav from '../components/BottomNav'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink, faDownload, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Spinner from '../components/Spinner'

export default function DetailPage(){
  const router = useRouter()
  const { service, url } = router.query
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    if (!service || !url) return
    const fetchData = async () => {
      setLoading(true); setError(''); setData(null)
      try {
        const res = await axios.get(`/api/download?service=${service}&url=${encodeURIComponent(String(url))}`)
        setData(res.data)
      } catch (e:any) {
        setError(e?.response?.data?.message || e.message || 'Error')
      } finally { setLoading(false) }
    }
    fetchData()
  }, [service, url])

  // Determine best file URL from API response
  const getFirstFile = () => {
    if (!data) return null
    if (Array.isArray(data.files) && data.files.length>0) return data.files[0]
    if (data.url) return { url: data.url, mime: data.mime || '', size: data.size, quality: data.quality }
    return null
  }

  const first = getFirstFile()
  const isVideo = first && (first.mime?.includes('video') || (first.url && first.url.endsWith('.mp4')))
  const isAudio = first && (first.mime?.includes('audio') || (first.url && (first.url.endsWith('.mp3') || first.url.endsWith('.m4a'))))

  return (
    <>
      <Head><title>Detail - Medsos Downloader</title></Head>
      <main className="min-h-screen bg-gradient-to-b from-white to-slate-50 flex flex-col pb-24">
        <div className="container mx-auto px-4 pt-6">
          <button onClick={()=>router.back()} className="inline-flex items-center gap-2 text-sm mb-4">
            <FontAwesomeIcon icon={faChevronLeft} /> Kembali
          </button>

          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-2">Detail Download</h2>
            <div className="text-sm text-gray-600 mb-4">Service: <strong>{String(service || '')}</strong></div>

            {!service || !url ? (
              <div className="text-sm text-red-600">Parameter service atau url tidak ditemukan.</div>
            ) : null}

            {loading && <div className="text-center py-6"><Spinner /></div>}
            {error && <div className="text-sm text-red-600">{error}</div>}

            {data && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  {isVideo ? (
                    <video controls className="w-full rounded">
                      <source src={first.url} type={first.mime || 'video/mp4'} />
                      Browser Anda tidak mendukung pemutar video.
                    </video>
                  ) : isAudio ? (
                    <audio controls className="w-full">
                      <source src={first.url} type={first.mime || 'audio/mpeg'} />
                      Browser Anda tidak mendukung pemutar audio.
                    </audio>
                  ) : data.thumbnail ? (
                    <img src={data.thumbnail} alt="thumbnail" className="w-full rounded" />
                  ) : (
                    <div className="w-full h-48 rounded bg-slate-100 flex items-center justify-center text-sm text-gray-500">No preview available</div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Judul</div>
                    <div className="font-semibold text-lg">{data.title || data.meta?.title || 'Tidak ada judul'}</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Deskripsi</div>
                    <div className="text-sm text-gray-700">{data.description || data.meta?.description || 'Tidak ada deskripsi'}</div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-500">Sumber URL</div>
                    <a className="text-blue-600 underline inline-flex items-center gap-2" href={String(url)} target="_blank" rel="noreferrer">
                      <FontAwesomeIcon icon={faLink} /> Buka sumber
                    </a>
                  </div>

                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-2">Tersedia file</div>
                    {Array.isArray(data.files) && data.files.length>0 ? (
                      <div className="space-y-2">
                        {data.files.map((f:any, i:number)=>(
                          <div key={i} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <div className="font-medium">{f.quality || f.type || `File ${i+1}`}</div>
                              <div className="text-xs text-gray-500">{f.size || f.mime || ''}</div>
                            </div>
                            <a className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded" href={f.url || f.download || '#'} target="_blank" rel="noreferrer">
                              <FontAwesomeIcon icon={faDownload} /> Download
                            </a>
                          </div>
                        ))}
                      </div>
                    ) : (
                      first ? (
                        <div className="flex items-center gap-3">
                          <div className="text-sm">{data.filename || 'Result file'}</div>
                          <a className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded" href={first.url} target="_blank" rel="noreferrer">
                            <FontAwesomeIcon icon={faDownload} /> Download
                          </a>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">Tidak ada file yang dapat didownload.</div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <BottomNav />
      </main>
    </>
  )
}