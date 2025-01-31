'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import mapService from '@/services/mapService';

const MapContext = createContext();

export function MapProvider({ children }) {
  const [currentMap, setCurrentMap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMap = async (mapId, token) => {
    try {
      setLoading(true);
      const map = await mapService.getMap(mapId, token);
      setCurrentMap(map);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MapContext.Provider value={{ currentMap, loading, error, fetchMap }}>
      {children}
    </MapContext.Provider>
  );
}

export const useMap = () => useContext(MapContext);