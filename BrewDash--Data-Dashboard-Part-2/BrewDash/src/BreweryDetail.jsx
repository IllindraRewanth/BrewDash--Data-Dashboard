import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_URL ="https://api.openbrewerydb.org/v1/breweries?per_page=100";

function BreweryDetail() {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    const fetchBreweryDetail = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);
        const data = await response.json();
        setBrewery(data);
      } catch (error) {
        console.error("Error fetching brewery detail:", error);
      }
    };

    fetchBreweryDetail();
  }, [id]);

  if (!brewery) return <p>Loading...</p>;

  return (
    <>
      <h1>{brewery.name}</h1>
      <p><strong>Type:</strong> {brewery.brewery_type}</p>
      <p><strong>City:</strong> {brewery.city}</p>
      <p><strong>State:</strong> {brewery.state}</p>
      {brewery.website_url && (
        <>
          <strong>Website:</strong>{" "}
          <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </>
      )}
    </>
  );
}

export default BreweryDetail;
