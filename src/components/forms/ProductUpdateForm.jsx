import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const ProductUpdateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  categories,
  setValues,
  subOptions,
  arrayOfSubIds,
  setArrayOfSubIds,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    images,
    colors,
    color,
    brand,
    brands,
    quantity,
  } = values;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Desc</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Shipping</label>
          <select
            value={shipping === 'Yes' ? 'Yes' : 'No'}
            name="shipping"
            className="form-control"
            onChange={handleChange}
          >
            <option> Please select a shipping method</option>
            <option value="No"> No</option>
            <option value="Yes"> Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            className="form-control"
            value={quantity}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Color</label>
          <select
            name="color"
            className="form-control"
            onChange={handleChange}
            value={color}
          >
            {colors?.map((color) => (
              <option key={color} value={color}>
                {' '}
                {color}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Brand</label>
          <select
            value={brand}
            name="brand"
            className="form-control"
            onChange={handleChange}
          >
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {' '}
                {brand}
              </option>
            ))}
          </select>
        </div>
        {categories.length}

        <br />

        <div>
          <label htmlFor="Category"></label>
          <select
            className="form-control mb-3"
            name="category"
            onChange={handleCategoryChange}
            value={selectedCategory ? selectedCategory : category._id}
          >
            {/* <option value="">
              {category ? category.name : 'Please select'}
            </option> */}
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <br />

        <div>
          <label htmlFor="Sub categories"></label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="please select value"
            // value={subs}

            value={arrayOfSubIds}
            onChange={(value) => setArrayOfSubIds(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option value={s._id} key={s._id}>
                  {s.name}{' '}
                </Option>
              ))}
          </Select>
        </div>

        {JSON.stringify(values.subs)}
        <button type="submit" className="btn btn-outline-info">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductUpdateForm;
