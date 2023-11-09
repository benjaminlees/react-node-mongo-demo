import { useEffect, useState } from 'react'
import './UrlList.css'
import axios from 'axios'

type ShortendUrlSchema = {
  orginalUrl: String,
  shortenedUrl: string,
  _id: string
}

function UrlList() {
  const [urls, setUrls] = useState<ShortendUrlSchema[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/shortened-urls')
      .then((response) => {
        setUrls(response.data)
        console.log(response.data)

      })

  }, [])
  return (
    <div className='url-list-container'>
      <ul>
        {urls.map((url: any) => {
          return <li key={url._id}><a href={url.shortenedUrl}>{url.shortenedUrl}</a></li>
        })}
      </ul>
    </div>
  )
}

export default UrlList
