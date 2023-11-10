import { createContext } from 'react';
import { ShortendUrlSchema } from '../types';

type ShortendUrlContext = {
  urls: ShortendUrlSchema[],
  setUrls: (urls: ShortendUrlSchema[]) => void,
  addToUrls: (url: ShortendUrlSchema) => void
};

export const UrlsContext = createContext<ShortendUrlContext>({
  urls: [],
  setUrls: () => {},
  addToUrls: () => {}
});