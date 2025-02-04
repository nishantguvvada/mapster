'use client';

import { useParams } from 'next/navigation';
import { useMap } from '@/context/MapContext';
import MapComponent from '@/components/map/MapComponent';
import ShareModal from '@/components/ui/ShareModal';
import AddCityForm from '@/components/ui/AddCityForm';
import { useState, useEffect } from 'react';

export default function MapDetailPage() {
  const params = useParams();
  const { currentMap, fetchMap } = useMap();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    fetchMap(params.mapId, token);
  }, [params.mapId]);

  if (!currentMap) return <div>Loading map...</div>;

  return (
    <div className="h-screen relative">
      <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.45.0/mapbox-gl.css' rel='stylesheet' />
      {/* Map controls */}
      <MapComponent mapData={currentMap} />
      
      {/* Modals */}
      {showAddCity && <AddCityForm />}
      <ShareModal
        map={currentMap}
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}