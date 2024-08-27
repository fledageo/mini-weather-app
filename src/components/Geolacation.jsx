import React, { useState } from 'react';

const CityNameComponent = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [city, setCity] = useState('');
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchCityName(latitude, longitude);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    const apiKey = '8f4fb066d4257f9be45c3917d597f288';
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.length > 0) {
        setCity(data[0].name);
      } else {
        setError('City not found.');
      }
    } catch (error) {
      setError('Failed to fetch city name.');
    }
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          {city && <p>City: {city}</p>}
        </div>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default CityNameComponent;