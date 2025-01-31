'use client';

import { FaMapMarkerAlt } from 'react-icons/fa';

export default function CityMarker({ city, onClick }) {
  return (
    <Marker
      latitude={city.location.coordinates[1]}
      longitude={city.location.coordinates[0]}
    >
      <button
        className="marker-pulse text-red-500 text-2xl"
        onClick={onClick}
        aria-label={`City marker for ${city.name}`}
      >
        <FaMapMarkerAlt />
      </button>
    </Marker>
  );
}