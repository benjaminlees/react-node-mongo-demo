import { useEffect, useContext } from 'react'
import './UrlList.css'
import axios from 'axios'
import { UrlsContext } from '../context'
import { getEnv } from '../helper'

function UrlList() {
  const {urls, setUrls} = useContext(UrlsContext)
  useEffect(() => {
    axios.get(`${getEnv('VITE_API_URL')}/shortened-urls`)
      .then((response) => {
        console.log('data>>>', response.data)
        setUrls(response.data)
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
