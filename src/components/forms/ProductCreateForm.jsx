import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const ProductCreateForm = ({
  handleChange,
  handleSubmit,
  values,
  handleCategoryChange,
  setValues,
  subOptions,
  showSub,
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

    categories,
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
          <select name="color" className="form-control" onChange={handleChange}>
            <option> Please select a color</option>
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
          <select name="brand" className="form-control" onChange={handleChange}>
            <option> Please select a brand</option>
            {brands?.map((brand) => (
              <option key={brand} value={brand}>
                {' '}
                {brand}
              </option>
            ))}
          </select>
        </div>
        {categories.length}

        <div>
          <label htmlFor="Category"></label>
          <select
            className="form-control mb-3"
            name="category"
            onChange={handleCategoryChange}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        {showSub && (
          <div>
            <label htmlFor="Sub categories"></label>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="please select value"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option value={s._id} key={s._id}>
                    {s.name}{' '}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        <br />
        {JSON.stringify(values.subs)}
        <button type="submit" className="btn btn-outline-info">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductCreateForm;
