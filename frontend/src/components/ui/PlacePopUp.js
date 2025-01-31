'use client';

export default function PlacePopup({ place }) {
  return (
    <div className="max-w-xs">
      <h3 className="font-bold text-lg mb-2">{place.name}</h3>
      {place.photos?.length > 0 && (
        <img 
          src={place.photos[0]} 
          alt={place.name} 
          className="w-full h-32 object-cover mb-2 rounded"
        />
      )}
      <div className="flex items-center mb-2">
        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
          {place.type}
        </span>
      </div>
      {place.review && (
        <p className="text-sm text-gray-600">{place.review}</p>
      )}
    </div>
  );
}