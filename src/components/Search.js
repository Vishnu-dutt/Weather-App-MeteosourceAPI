import React, { useContext, useState, useEffect } from "react";
import "../styles/components/Search.scss";
import { searchPlaces } from "../apis";
import WeatherContext from "../context/weather.context";

function Search() {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { setPlace } = useContext(WeatherContext);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null); // Store timeout ID

  useEffect(() => {
    if (!text.trim()) {
      setSearchResults([]);
      setOpenSearchResults(false);
      return;
    }

    // Clear previous timeout to reset the delay
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout for API call after 4 seconds
    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchPlaces(text);
        console.log("Search API Response:", data);

        setSearchResults(Array.isArray(data) ? data : []);
        setOpenSearchResults(data?.length > 0);
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
        setOpenSearchResults(false);
      }
    }, 4000); // API call delayed by 4 seconds

    setTypingTimeout(timeoutId); // Store timeout ID
  }, [text]); // Runs every time `text` changes

  const changePlace = (place) => {
    setPlace(place);
    setText("");
    setOpenSearchResults(false);
  };

  return (
    <div className="search-container">
      <div className="search-icon">
        <i className="bi bi-search"></i>
      </div>
      <div className="search-input">
        <input
          type="text"
          name="search-city"
          placeholder="Search city ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      {openSearchResults && (
        <div className="search-results">
          <div className="results-container">
            {searchResults.map((place, index) => (
              <div
                className="result"
                key={place.place_id || index}
                onClick={() => changePlace(place)}
              >
                {place.name}, {place.adm_area1}, {place.country}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
