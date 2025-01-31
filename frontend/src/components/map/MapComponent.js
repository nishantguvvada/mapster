'use client';

import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import CityMarker from './CityMarker';
import PlacePopup from '../ui/PlacePopUp';

export default function MapComponent({ mapData }) {
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 2
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <div className="relative h-screen w-full">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={e => setViewport(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      >
        <NavigationControl showCompass={false} />
        
        {mapData?.cities?.map(city => (
          <CityMarker
            key={city._id}
            city={city}
            onClick={() => setViewport({
              latitude: city.location.coordinates[1],
              longitude: city.location.coordinates[0],
              zoom: 12
            })}
          />
        ))}

        {selectedPlace && (
          <Popup
            latitude={selectedPlace.location.coordinates[1]}
            longitude={selectedPlace.location.coordinates[0]}
            onClose={() => setSelectedPlace(null)}
          >
            <PlacePopup place={selectedPlace} />
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}