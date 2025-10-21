// src/hooks/useSearch.js
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

export const useSearch = (items, options) => {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(items, options), [items, options]);

  const results = useMemo(() => {
    if (!query) return items;
    return fuse.search(query).map(result => result.item);
  }, [query, fuse, items]);

  return { query, setQuery, results };
};
