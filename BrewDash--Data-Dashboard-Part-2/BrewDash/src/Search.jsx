// Search.jsx
import React, { useState } from "react";

function Search({ setSearchTerm, setBreweryType, setCityFilter, setStateFilter, setActiveView, uniqueTypes, uniqueStates }) {
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [localBreweryType, setLocalBreweryType] = useState("");
  const [localCity, setLocalCity] = useState("");
  const [localState, setLocalState] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Apply all filters
    setSearchTerm(localSearchTerm);
    setBreweryType(localBreweryType);
    setCityFilter(localCity);
    setStateFilter(localState);
    
    // Navigate back to dashboard
    setActiveView("dashboard");
  };

  return (
    <div className="search-page">
      <h1>Advanced Search</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Brewery Name:</label>
          <input 
            type="text" 
            placeholder="Enter brewery name" 
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Brewery Type:</label>
          <select 
            value={localBreweryType} 
            onChange={(e) => setLocalBreweryType(e.target.value)}
            className="form-input"
          >
            <option value="">All Types</option>
            {uniqueTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>City:</label>
          <input 
            type="text" 
            placeholder="Enter city" 
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>State:</label>
          <select 
            value={localState} 
            onChange={(e) => setLocalState(e.target.value)}
            className="form-input"
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="search-button">Apply Filters</button>
      </form>
    </div>
  );
}

export default Search;
