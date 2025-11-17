import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { faTiktok, faYoutube } from '@fortawesome/free-brands-svg-icons'

export default function BottomNav(){
  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-full px-4 py-2 flex gap-6">
      <button className="flex flex-col items-center text-sm">
        <FontAwesomeIcon icon={faHome} />
        <span>Home</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FontAwesomeIcon icon={faTiktok} />
        <span>TikTok</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FontAwesomeIcon icon={faYoutube} />
        <span>YT</span>
      </button>
      <button className="flex flex-col items-center text-sm">
        <FontAwesomeIcon icon={faInfoCircle} />
        <span>Info</span>
      </button>
    </nav>
  )
}