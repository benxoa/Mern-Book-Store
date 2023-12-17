import React, { useState } from "react";

const SearchBar = ({ data, onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e) => {
      const { value } = e.target;
      setSearchTerm(value);
    };
  
    const handleSearchClick = () => {
      onSearch(searchTerm);
    };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
          <button onClick={handleSearchClick}>Search</button>

    </div>

  );
};

export default SearchBar;
