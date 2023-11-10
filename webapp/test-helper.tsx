import React, { useState } from 'react';
import { ShortendUrlSchema } from './types';
import { UrlsContext } from './src/context';

export const MockContext = (props: { children: React.ReactNode }) => {
  const [urls, setUrls] = useState<ShortendUrlSchema[]>([]);
  const addToUrls = (url: ShortendUrlSchema) => {
    setUrls([...urls, url])
  }
  return (
    <>
      <UrlsContext.Provider value={{urls, setUrls, addToUrls}} >
      {props.children}
      </UrlsContext.Provider>

    </>
  )
}