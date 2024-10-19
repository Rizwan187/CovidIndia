// MapView.tsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CovidData } from '../types/CovidDataTypes'; // Ensure the path is correct

interface MapViewProps {
  selectedState: string;
  covidData: CovidData; // Ensure this type matches your CovidData structure
}

const MapView: React.FC<MapViewProps> = ({ selectedState, covidData }) => {
  // Find the data for the selected state
  const stateData = covidData?.data?.regional.find((region) => region.loc === selectedState);

  // Ensure latitude and longitude are available; use default coordinates if not
  const lat =  20.5937; // Default to India's center latitude
  const lng =  78.9629; // Default to India's center longitude

  // Validate latitude and longitude
  const isValidLatLng = (lat: number | undefined, lng: number | undefined): boolean => {
    return lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng);
  };

  return (
    <MapContainer 
      style={{ height: '100vh', width: '100%' }}
      className="map-container" // Optional: Add a class for styling
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {isValidLatLng(lat, lng) && (
        <Marker position={[lat, lng]}>
          <Popup>
            <div>
              <h2>{selectedState}</h2>
              <p>Total Confirmed: {stateData?.totalConfirmed}</p>
              <p>Active Cases: {stateData?.confirmedCasesIndian}</p>
              <p>Recovered: {stateData?.discharged}</p>
              <p>Deaths: {stateData?.deaths}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;
