'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/services/api';

export default function MapsPage() {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        const { data } = await api.get('/maps');
        setMaps(data.data);
      } catch (err) {
        console.error('Failed to fetch maps:', err);
      }
    };
    fetchMaps();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Travel Maps</h1>
        <Link
          href="/maps/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create New Map
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {maps.map(map => (
          <Link
            key={map._id}
            href={`/maps/${map._id}`}
            className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{map._id}</h3>
            <p className="text-gray-600">
              {map.cities?.length || 0} cities
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}