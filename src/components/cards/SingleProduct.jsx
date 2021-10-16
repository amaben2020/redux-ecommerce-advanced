import React from 'react';
import { Card, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Laptop from './../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../utils/rating';

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

  const { Meta } = Card;
  const { TabPane } = Tabs;
  return (
    <>
      <div className="col-md-7">
        {images?.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
          </Carousel>
        ) : (
          <Card cover={<img src={Laptop} className="mb-3 card-image" />}></Card>
        )}

        <Tabs type="card">
          <TabPane tab="Description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            Please call my number to place bulk orders
          </TabPane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{title}</h1>

        {/* <div>
          {product && product.ratings.length > 0 && product.ratings
            ? showAverage(product)
            : 'No rating yet'}
        </div> */}
        <Card
          actions={[
            <>
              <ShoppingCartOutlined className="text-success" /> <br /> Add To
              Cart
            </>,
            <Link to={`/`}>
              {' '}
              <HeartOutlined className="text-info" /> Add to Wishlist
            </Link>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                isSelectable={true}
                starRatedColor="red"
                rating={star}
                changeRating={onStarClick}
              />
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
