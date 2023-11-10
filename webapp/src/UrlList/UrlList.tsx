import './UrlList.css'
import { useEffect, useContext } from 'react'
import axios from 'axios'
import { UrlsContext } from '../context'

function UrlList() {
  const {urls, setUrls} = useContext(UrlsContext)
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/shortened-urls`)
      .then((response) => {
        setUrls(response.data)
        console.log(response)
      })
  }, [setUrls])
  return (
    <div className='url-list-container'>
      <ul>
        {urls.map((url) => {
          return <li key={url._id}><a href={url.shortenedUrl}>{url.shortenedUrl}</a></li>
        })}
      </ul>
    </div>
  )
}

export default UrlList
