import React from 'react';

const SelectOption = ({ categories, parent, setCategory }) => {
  return (
    <div>
      <select name="category" onChange={(e) => setCategory(e.target.value)}>
        <option> Please select</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option
              key={c._id}
              value={c._id}
              className="form-control"
              selected={c._id === parent}
            >
              {c.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectOption;
