// DetailView.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const API_URL = "https://api.openbrewerydb.org/v1/breweries";

function DetailView() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrewery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/${id}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch brewery: ${response.status}`);
        }
        
        const data = await response.json();
        setBrewery(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brewery details:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchBrewery();
  }, [id]);

  if (loading) return <div className="loading">Loading brewery details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!brewery) return <div className="not-found">Brewery not found</div>;

  // Check if we have coordinates for the map
  const hasCoordinates = brewery.latitude && brewery.longitude;
  const position = hasCoordinates ? [parseFloat(brewery.latitude), parseFloat(brewery.longitude)] : null;

  return (
    <div className="detail-view">
      <div className="detail-header">
        <Link to="/" className="back-button">← Back to Dashboard</Link>
        <h1>{brewery.name}</h1>
      </div>
      
      <div className="detail-content">
        <div className="detail-card">
          <h2>Brewery Information</h2>
          <div className="detail-info">
            <div className="detail-row">
              <span className="detail-label">Type:</span>
              <span className="detail-value">{brewery.brewery_type}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Address:</span>
              <span className="detail-value">
                {brewery.street && `${brewery.street}, `}
                {brewery.city}, {brewery.state} {brewery.postal_code}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Phone:</span>
              <span className="detail-value">
                {brewery.phone ? brewery.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'Not available'}
              </span>
            </div>
            
            {brewery.website_url && (
              <div className="detail-row">
                <span className="detail-label">Website:</span>
                <span className="detail-value">
                  <a href={brewery.website_url} target="_blank" rel="noopener noreferrer" className="website-link">
                    {brewery.website_url}
                  </a>
                </span>
              </div>
            )}
            
            <div className="detail-row">
              <span className="detail-label">Last Updated:</span>
              <span className="detail-value">
                {new Date(brewery.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        {hasCoordinates && (
          <div className="map-card">
            <h2>Brewery Location</h2>
            <div className="map-container">
              <MapContainer 
                center={position} 
                zoom={13} 
                style={{ height: "400px", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>
                    {brewery.name} <br />
                    {brewery.street && `${brewery.street}, `}
                    {brewery.city}, {brewery.state}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailView;
