import { Card } from 'antd';
import React from 'react';
import laptop from './../../images/laptop.png';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, images, description, price, slug } = product;
  console.log(images);

  return (
    <Card
      className="m-2"
      cover={
        <img
          style={{ height: '150px', objectFit: 'cover' }}
          className="p-1"
          src={images && images.length ? images[0].url : laptop}
          alt={title}
        />
      }
      actions={[
        <Link to={`/admin/product/${slug}`}>
          {' '}
          <EditOutlined className="text-warning" />{' '}
        </Link>,
        <DeleteOutlined
          //doing it this way because of the slug so it does not execute immediately
          onClick={() => handleRemove(slug)}
          className="text-danger"
        />,
      ]}
    >
      <Meta
        title={title}
        description={`${description && description.substring(0, 40)}...`}
      />
    </Card>
  );
};

export default AdminProductCard;
