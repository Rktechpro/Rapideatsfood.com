
import React, { useContext, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import { context_store } from "../../context/ContextStore";
import "./search.css";

const Search = () => {
  const { url } = useContext(context_store);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axios.get(`${url}/api/food/list?q=${query}`);
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search for food, cuisine or a dish"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="search__button" onClick={handleSearch}>
          <SearchOutlined />
        </button>
      </div>

      <div className="search-results">
        {results
          .filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
          .map((item) => (
            <div key={item._id} className="search-item">
              <img
                src={`${url}/images/${item.image}`}
                alt={item.name}
                className="search-item__image"
              />
              <h3 className="search-item__name">{item.name}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
