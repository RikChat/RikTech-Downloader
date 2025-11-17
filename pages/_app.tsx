import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useEffect } from 'react'

function registerSW(){
  if(typeof window !== 'undefined' && 'serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js').catch(()=>{})
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(()=>{ registerSW() },[])
  return <>
    <Head>
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="theme-color" content="#8b5cf6" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <title>RikTech Downloader</title>
    </Head>
    <Component {...pageProps} />
  </>
}
