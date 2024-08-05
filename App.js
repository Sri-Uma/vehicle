import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, Polyline, useLoadScript } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];
const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};
const center = { lat: 17.385044, lng: 78.486671 };

function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    libraries
  });
  
  const [location, setLocation] = useState(center);
  const [path, setPath] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/location');
        const data = response.data;
        setLocation(data.current);
        setPath(data.route);
      } catch (error) {
        console.error("Error fetching location data", error);
      }
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading...";

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={location}
      zoom={15}
    >
      <Marker position={location} />
      <Polyline
        path={path}
        options={{ strokeColor: "#FF0000", strokeOpacity: 0.8, strokeWeight: 2 }}
      />
    </GoogleMap>
  );
}

export default App;
