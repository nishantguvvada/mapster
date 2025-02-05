'use client';

import { useState, useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl';
import { SearchBox } from '@mapbox/search-js-react';
import { HiLocationMarker } from "react-icons/hi";
import CityMarker from './CityMarker';

// https://stackoverflow.com/questions/41057604/error-illegal-reassignment-to-import/41118458#41118458

export default function MapComponent({ mapData }) {
  const [viewport, setViewport] = useState({
    latitude: 20,
    longitude: 0,
    zoom: 2
  });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const mapContainerRef = useRef();

  const handleClick = (event) => {
    console.log("longlat", event);
    setSelectedPlace({location: {
      coordinates: [event.lngLat.lng, event.lngLat.lat]
    }});
  }
  const handleSearchResult = (result) => {
    const [longitude, latitude] = result.features[0].geometry.coordinates;
    const name = result.features[0].properties.name;
    setSearchedLocation({
      latitude,
      longitude,
      name
    });
    setInputValue(name);
  };

  return (
    <div className="relative h-screen w-full">
      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
        <SearchBox
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          options={{
          language: 'en'
          }}
          map={mapContainerRef.current}
          value={inputValue}
          onRetrieve={handleSearchResult}
          marker
        />
      </div>
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={e => setViewport(e.viewState)}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        onClick={handleClick}
        ref={mapContainerRef}
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

        {searchedLocation && (
          <Marker
            latitude={searchedLocation.latitude}
            longitude={searchedLocation.longitude}
            zoom={12}
          >
              <h1 className='bg-white rounded-lg px-2'>{searchedLocation.name}</h1>
              <button
                className="marker-pulse text-red-600 text-2xl"
              >
                <HiLocationMarker />
              </button>
          </Marker>
        )}

        {selectedPlace && (
            <Marker
                  latitude={selectedPlace.location.coordinates[1]}
                  longitude={selectedPlace.location.coordinates[0]}
                >
                  <button className="text-red-600 text-2xl">
                    <HiLocationMarker />
                  </button>
            </Marker>

        )}
      </ReactMapGL>
    </div>
  );
}