import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const PlacesPage: React.FC = () => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%"
  };

  const center = {
    lat: 37.7749, // Example latitude
    lng: -122.4194 // Example longitude
  };

  const places = [
    { id: 1, name: "Dog Park", location: { lat: 37.7749, lng: -122.4194 } },
    { id: 2, name: "Pet-Friendly Cafe", location: { lat: 37.7849, lng: -122.4094 } },
    // Add more places as needed
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pet-Friendly Places</h1>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {places.map(place => (
            <Marker key={place.id} position={place.location} title={place.name} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default PlacesPage;