import './App.css'
import Form from '../Form/Form';
import UrlList from '../UrlList/UrlList';
import { UrlsContext } from '../context';
import { ShortendUrlSchema } from '../../types';
import { useState } from 'react';

function App() {
  const [urls, setUrls] = useState<ShortendUrlSchema[]>([]);
  const addToUrls = (url: ShortendUrlSchema) => {
    setUrls([...urls, url])
  }
  return (
    <>
      <UrlsContext.Provider value={{urls, setUrls, addToUrls}} >
        <div className='main-container'>
          <div>
            <h1>URL shortener ☺</h1>
            <Form />
          </div>
          <UrlList />
        </div>
      </UrlsContext.Provider>

    </>
  )
}

export default App
