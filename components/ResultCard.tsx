import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function ResultCard({service, url, title, subtitle}:{service:string,url:string,title?:string,subtitle?:string}){
  const q = new URLSearchParams({ service, url })
  return (
    <Link href={`/detail?${q.toString()}`}>
      <a className="block p-3 border rounded hover:shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-slate-100 rounded">
              <FontAwesomeIcon icon={faFileAlt} />
            </div>
            <div>
              <div className="font-medium">{title || service}</div>
              <div className="text-xs text-gray-500">{subtitle || url}</div>
            </div>
          </div>
          <div><FontAwesomeIcon icon={faChevronRight} /></div>
        </div>
      </a>
    </Link>
  )
}