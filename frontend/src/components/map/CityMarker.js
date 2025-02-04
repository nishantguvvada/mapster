'use client';

import { HiLocationMarker } from "react-icons/hi";
import { Marker } from 'react-map-gl';

export default function CityMarker({ city, onClick }) {
  return (
    <Marker
      latitude={city.location.coordinates[1]}
      longitude={city.location.coordinates[0]}
    >
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="bg-white p-1.5 rounded-lg">{city.name}</h1>
        <button
          className="text-red-600 text-2xl"
          onClick={onClick}
          aria-label={`City marker for ${city.name}`}
        >
          <HiLocationMarker />
        </button>
      </div>
    </Marker>
  );
}