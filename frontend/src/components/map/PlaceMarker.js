'use client';

export default function PlaceMarker({ place, onClick }) {
  const iconColor = place.type === 'hotel' ? 'text-blue-500' : 'text-green-500';
  
  return (
    <Marker
      latitude={place.location.coordinates[1]}
      longitude={place.location.coordinates[0]}
    >
      <button
        className={`${iconColor} text-xl`}
        onClick={onClick}
        aria-label={`${place.type} marker for ${place.name}`}
      >
        {place.type === 'hotel' ? '🏨' : '🍴'}
      </button>
    </Marker>
  );
}   