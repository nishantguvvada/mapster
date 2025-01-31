'use client';

import { useParams } from 'next/navigation';
import { useMap } from '@/context/MapContext';
import MapComponent from '@/components/map/MapComponent';
import ShareModal from '@/components/ui/ShareModal';
import AddCityForm from '@/components/ui/AddCityForm';

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