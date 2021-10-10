import React from 'react';

const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name"></label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
            value={name}
            autoFocus
            required
          />
          <br />

          <button className="btn btn-outline-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
