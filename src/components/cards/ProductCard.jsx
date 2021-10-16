import React from 'react';
import { Card } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from './../../images/laptop.png';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { Meta } = Card;

  const { images, title, slug, description } = product;

  return (
    <Card
      cover={
        <img
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
          src={images && images.length ? images[0].url : laptop}
          alt={title}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          {' '}
          <EyeOutlined className="text-warning" /> <br />
          View Product
        </Link>,
        <>
          <ShoppingCartOutlined
            //doing it this way because of the slug so it does not execute immediately

            className="text-danger"
          />
          ,<br />
          Add To Cart
        </>,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
      {product.title}
    </Card>
  );
};

export default ProductCard;
