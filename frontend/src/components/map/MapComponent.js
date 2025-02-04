'use client';

import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl';
import { HiLocationMarker } from "react-icons/hi";
import CityMarker from './CityMarker';
import PlacePopup from '../ui/PlacePopUp';

// https://stackoverflow.com/questions/41057604/error-illegal-reassignment-to-import/41118458#41118458

export default function MapComponent({ mapData }) {
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 2
  });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleClick = (event) => {
    console.log("longlat", event);
    setSelectedPlace({location: {
      coordinates: [event.lngLat.lng, event.lngLat.lat]
    }});
  }

  return (
    <div className="relative h-screen w-full">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={e => setViewport(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={handleClick}
      >
        <NavigationControl showCompass={true} />
        <GeolocateControl/>
        
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
          <Marker
                latitude={selectedPlace.location.coordinates[1]}
                longitude={selectedPlace.location.coordinates[0]}
              >
                <div className="flex flex-col justify-center items-center gap-1">
                  <div className="bg-white p-1.5 rounded-lg text-center">Add a visited city
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1"/>
                    <button type="button" className="py-1 px-2 mt-2 text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Save</button>
                  </div>
                  <button
                    className="text-red-600 text-2xl"
                    onClick={() => setViewport({
                      latitude: city.location.coordinates[1],
                      longitude: city.location.coordinates[0],
                      zoom: 12
                    })}
                  >
                    <HiLocationMarker />
                  </button>
                </div>
          </Marker>
          // <Popup
          //   latitude={selectedPlace.location.coordinates[1]}
          //   longitude={selectedPlace.location.coordinates[0]}
          //   onClose={() => setSelectedPlace(null)}
          // >
          //   <h1>Hello</h1>
          //   <PlacePopup place={selectedPlace} />
          // </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}