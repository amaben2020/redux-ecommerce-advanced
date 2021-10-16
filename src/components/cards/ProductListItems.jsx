import React from 'react';
import { Link } from 'react-router-dom';
const ProductListItems = ({ product }) => {
  const { price, category, subs, shipping, color, brand, sold, quantity } =
    product;
  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price{' '}
        <span className="label label-default label-pill pull-xs-right">
          ${price}{' '}
        </span>
      </li>
      {category && (
        <li className="list-group-item">
          Category{' '}
          <Link
            to={`/category/${category?.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}
      {subs && (
        <li className="list-group-item">
          Sub categories
          <span className="label label-default label-pill pull-xs-right">
            {subs.map((s) => (
              <Link key={s._id} to={`/sub/${s.slug}`}>
                {' '}
                {s.name}{' '}
              </Link>
            ))}{' '}
          </span>
        </li>
      )}
      <li className="list-group-item">
        shipping{' '}
        <span className="label label-default label-pill pull-xs-right">
          {shipping}{' '}
        </span>
      </li>{' '}
      <li className="list-group-item">
        color{' '}
        <span className="label label-default label-pill pull-xs-right">
          {color}{' '}
        </span>
      </li>{' '}
      <li className="list-group-item">
        Brand{' '}
        <span className="label label-default label-pill pull-xs-right">
          {brand}{' '}
        </span>
      </li>{' '}
      <li className="list-group-item">
        Available in stock{' '}
        <span className="label label-default label-pill pull-xs-right">
          {quantity}{' '}
        </span>
      </li>
      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}{' '}
        </span>
      </li>
    </ul>
  );
};

export default ProductListItems;
