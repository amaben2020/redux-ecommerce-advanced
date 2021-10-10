import React from 'react';

const LocalSearch = ({ keyword, setKeyword, curve }) => {
  const handleSearchChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };
  return (
    <div>
      <input
        style={{
          borderRadius: `${curve}rem`,
        }}
        type="text"
        value={keyword}
        placeholder="filter by name"
        onChange={handleSearchChange}
        className="form-control mb-4"
      />
    </div>
  );
};

export default LocalSearch;
