import React, { useContext, useState } from "react";
import "../styles/components/Search.scss";
import { searchPlaces } from "../apis";
import WeatherContext from "../context/weather.context";

function Search() {
  const [text, setText] = useState("");
  const [searchResults, setSearchResults] = useState([]); // Fixed typo
  const { setPlace } = useContext(WeatherContext);
  const [openSearchResults, setOpenSearchReults] = useState(false);

  async function onSearch(e) {
    const value = e.target.value;
    setText(value);

    // Prevent unnecessary API calls for empty input
    if (!value.trim()) {
      setSearchResults([]);
      setOpenSearchReults(false);
      return;
    }

    try {
      const data = await searchPlaces(value);
      console.log("Search API Response:", data); // Debugging API response

      setSearchResults(Array.isArray(data) ? data : []); // Fallback to empty array
      setOpenSearchReults(data?.length > 0); // Ensure `data` is valid
    } catch (error) {
      console.error("Error fetching data:", error); // Log the error for debugging
      setSearchResults([]); // Reset results on error
      setOpenSearchReults(false); // Ensure results dropdown is hidden
    }
  }

  const changePlace = (place) => {
    setPlace(place);
    setText("");
    setOpenSearchReults(false);
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
          onChange={onSearch}
        />
      </div>
      {openSearchResults && (
        <div className="search-results">
          <div className="results-container">
            {searchResults.map((place, index) => (
              <div
                className="result"
                key={place.place_id || index} // Ensure unique key
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
