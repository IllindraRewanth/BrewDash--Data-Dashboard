// Dashboard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Dashboard({
  breweries,
  filteredBreweries,
  searchTerm,
  setSearchTerm,
  breweryType,
  setBreweryType,
  cityFilter,
  setCityFilter,
  stateFilter,
  setStateFilter,
  minSize,
  setMinSize,
  maxSize,
  setMaxSize,
  uniqueStates,
  uniqueTypes,
  loading
}) {
  // State to toggle charts visibility
  const [showCharts, setShowCharts] = useState(true);
  
  // Calculate summary statistics
  const totalBreweries = breweries.length;
  const microBreweries = breweries.filter(brewery => brewery.brewery_type === "micro").length;
  const brewpubs = breweries.filter(brewery => brewery.brewery_type === "brewpub").length;
  
  // Current time
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  // Prepare data for charts
  const breweryTypeData = [...new Set(breweries.map(b => b.brewery_type))]
    .filter(type => type) // Filter out null/undefined
    .map(type => ({
      name: type,
      value: breweries.filter(b => b.brewery_type === type).length
    }));

  const stateData = uniqueStates
    .slice(0, 10) // Limit to top 10 states to keep chart readable
    .map(state => ({
      name: state,
      value: breweries.filter(b => b.state === state).length
    }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1', '#a4de6c', '#d0ed57'];

  return (
    <>
      <h1>BrewDash</h1>
      
      {/* Summary Statistics Cards */}
      <div className="summary-cards">
        <div className="card">
          <h2>Brewery Count</h2>
          <p>{totalBreweries} Total</p>
        </div>
        
        <div className="card">
          <h2>{currentTime}</h2>
          <p>Beer O'Clock</p>
        </div>
        
        <div className="card">
          <h2>Top Types</h2>
          <p>🍺 {microBreweries} Micro</p>
          <p>🍻 {brewpubs} Brewpub</p>
        </div>
      </div>
      
      {/* Visualization Section */}
      <div className="data-insights">
        <div className="insights-header">
          <h2>Data Insights</h2>
          <button onClick={() => setShowCharts(!showCharts)} className="toggle-button">
            {showCharts ? "Hide Charts" : "Show Charts"}
          </button>
        </div>
        
        {showCharts && (
          <div className="charts-container">
            <div className="chart-explanation">
              <p>
                The craft beer industry has been growing rapidly in the United States. 
                These visualizations show the distribution of brewery types and their geographic spread.
                Microbreweries make up the largest segment, indicating a trend toward small-batch, local brewing.
              </p>
            </div>
            
            <div className="charts">
              <div className="chart">
                <h3>Brewery Types Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={breweryTypeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="chart">
                <h3>Top 10 States by Brewery Count</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stateData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {stateData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Multiple Filter Section */}
      <div className="filter-section">
        <div className="filter-row">
          {/* Text input filter */}
          <div className="filter-control">
            <label>Brewery Name:</label>
            <input 
              type="text" 
              placeholder="Enter brewery name" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Dropdown filter */}
          <div className="filter-control">
            <label>Brewery Type:</label>
            <select 
              value={breweryType} 
              onChange={(e) => setBreweryType(e.target.value)}
              className="select-input"
            >
              <option value="">All Types</option>
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="filter-row">
          {/* Text input filter */}
          <div className="filter-control">
            <label>City:</label>
            <input 
              type="text" 
              placeholder="Enter city" 
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="search-input"
            />
          </div>
          
          {/* Dropdown filter */}
          <div className="filter-control">
            <label>State:</label>
            <select 
              value={stateFilter} 
              onChange={(e) => setStateFilter(e.target.value)}
              className="select-input"
            >
              <option value="">All States</option>
              {uniqueStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Range slider with specific bounds */}
        <div className="filter-row">
          <div className="filter-control full-width">
            <label>Brewery Size Range:</label>
            <div className="slider-container">
              <input 
                type="number" 
                min="0" 
                max="100000" 
                value={minSize}
                onChange={(e) => setMinSize(parseInt(e.target.value))}
                className="range-input"
              />
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="5000"
                value={minSize}
                onChange={(e) => setMinSize(parseInt(e.target.value))}
                className="slider"
              />
              <input 
                type="range" 
                min="0" 
                max="100000" 
                step="5000"
                value={maxSize}
                onChange={(e) => setMaxSize(parseInt(e.target.value))}
                className="slider"
              />
              <input 
                type="number" 
                min="0" 
                max="100000" 
                value={maxSize}
                onChange={(e) => setMaxSize(parseInt(e.target.value))}
                className="range-input"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Breweries Table */}
      <div className="breweries-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Location</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4">Loading...</td></tr>
            ) : filteredBreweries.length === 0 ? (
              <tr><td colSpan="4">No breweries found</td></tr>
            ) : (
              filteredBreweries.map(brewery => (
                <tr key={brewery.id}>
                  <td>
                    <Link to={`/brewery/${brewery.id}`} className="brewery-link">
                      {brewery.name}
                    </Link>
                  </td>
                  <td>{brewery.brewery_type}</td>
                  <td>{brewery.city}, {brewery.state}</td>
                  <td>
                    <Link to={`/brewery/${brewery.id}`} className="details-button">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
