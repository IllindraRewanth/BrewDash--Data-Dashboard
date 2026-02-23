// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Sidebar from "./sidebar.jsx";
import Dashboard from "./Dashboard.jsx";
import Search from "./Search.jsx";
import About from "./About.jsx";
import DetailView from "./DetailView.jsx";

function App() {
  const [breweries, setBreweries] = useState([]);
  const [filteredBreweries, setFilteredBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [breweryType, setBreweryType] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Slider range values
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(100000);

  // Fetch breweries data
  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch("https://api.openbrewerydb.org/v1/breweries?per_page=100");
        const data = await response.json();
        setBreweries(data);
        setFilteredBreweries(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brewery data:", error);
        setLoading(false);
      }
    };

    fetchBreweries();
  }, []);

  // Apply all filters simultaneously
  useEffect(() => {
    let filtered = breweries;
    
    // Name search filter
    if (searchTerm) {
      filtered = filtered.filter(brewery => 
        brewery.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Brewery type dropdown filter
    if (breweryType) {
      filtered = filtered.filter(brewery => brewery.brewery_type === breweryType);
    }
    
    // City text filter
    if (cityFilter) {
      filtered = filtered.filter(brewery => 
        brewery.city && brewery.city.toLowerCase().includes(cityFilter.toLowerCase())
      );
    }
    
    // State dropdown filter
    if (stateFilter) {
      filtered = filtered.filter(brewery => brewery.state === stateFilter);
    }
    
    // Size range slider filters (using arbitrary field)
    filtered = filtered.filter(brewery => {
      // Using the postal code length as a proxy for "size" since the API doesn't have actual size
      const size = brewery.postal_code ? brewery.postal_code.length * 10000 : 50000;
      return size >= minSize && size <= maxSize;
    });
    
    setFilteredBreweries(filtered);
  }, [searchTerm, breweryType, cityFilter, stateFilter, minSize, maxSize, breweries]);

  // Get unique states for dropdown
  const uniqueStates = [...new Set(breweries.filter(b => b.state).map(b => b.state))];
  
  // Get unique brewery types for dropdown
  const uniqueTypes = [...new Set(breweries.filter(b => b.brewery_type).map(b => b.brewery_type))];

  return (
    <Router>
      <div className="app">
        <Sidebar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <Dashboard 
                breweries={breweries}
                filteredBreweries={filteredBreweries}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                breweryType={breweryType}
                setBreweryType={setBreweryType}
                cityFilter={cityFilter}
                setCityFilter={setCityFilter}
                stateFilter={stateFilter}
                setStateFilter={setStateFilter}
                minSize={minSize}
                setMinSize={setMinSize}
                maxSize={maxSize}
                setMaxSize={setMaxSize}
                uniqueStates={uniqueStates}
                uniqueTypes={uniqueTypes}
                loading={loading}
              />
            } />
            <Route path="/search" element={
              <Search 
                breweries={breweries}
                setSearchTerm={setSearchTerm}
                setBreweryType={setBreweryType}
                setCityFilter={setCityFilter}
                setStateFilter={setStateFilter}
                uniqueTypes={uniqueTypes}
                uniqueStates={uniqueStates}
              />
            } />
            <Route path="/about" element={<About />} />
            <Route path="/brewery/:id" element={<DetailView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
