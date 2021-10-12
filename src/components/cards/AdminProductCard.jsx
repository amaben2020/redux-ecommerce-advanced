import { Card } from 'antd';
import React from 'react';

const { Meta } = Card;

const AdminProductCard = ({ product }) => {
  const { title, images, description, price } = product;
  console.log(images);

  return (
    <Card
      cover={
        <img
          style={{ height: '150px', objectFit: 'cover' }}
          className="m-2"
          src={images && images.length ? images[0].url : 'No image'}
          alt={title}
        />
      }
    >
      <Meta title={title} description={description} />
    </Card>
  );
};

export default AdminProductCard;
