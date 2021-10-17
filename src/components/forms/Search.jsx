import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
const Search = () => {
  const dispatch = useDispatch();

  const { text } = useSelector((state) => state.search.text);

  const history = useHistory();

  const handleChange = (e) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: e.target.value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text) {
      history.push(`/shop?${text}`);
    }
  };
  return (
    <div>
      <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
        <input
          type="search"
          value={text}
          className="form-control mr-sm-2"
          placeholder="Search"
          onChange={handleChange}
        />

        <SearchOutlined onClick={handleSubmit} style={{ cursor: 'pointer' }} />
      </form>
    </div>
  );
};

export default Search;
