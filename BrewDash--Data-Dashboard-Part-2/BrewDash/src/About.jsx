// About.jsx
import React from "react";

function About() {
  return (
    <div className="about-page">
      <h1>About BrewDash</h1>
      
      <div className="about-content">
        <p>BrewDash is a comprehensive brewery dashboard that allows you to explore and discover breweries across the United States.</p>
        
        <h2>Data Source</h2>
        <p>Our data is sourced from the Open Brewery DB API, which provides information about breweries, cideries, brewpubs, and bottleshops.</p>
        
        <h2>Features</h2>
        <ul>
          <li>Search breweries by name, type, city, and state</li>
          <li>Apply multiple filters simultaneously</li>
          <li>View detailed information about each brewery</li>
          <li>Analyze brewery statistics</li>
        </ul>
        
        <h2>API Information</h2>
        <p>This project uses the Open Brewery DB API:</p>
        <ul>
          <li>API Endpoint: https://api.openbrewerydb.org/v1/breweries</li>
          <li>Documentation: https://www.openbrewerydb.org/documentation</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
