import { useState } from 'react';
import { Card, Tabs, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Laptop from './../../images/laptop.png';
import ProductListItems from './ProductListItems';
import StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import { showAverage } from '../../utils/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product;

  const { Meta } = Card;
  const { TabPane } = Tabs;

  const [toolTip, setTooltip] = useState('Add to cart');
  const dispatch = useDispatch();
  // const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    //show tooltip
    setTooltip('Added');
    //create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in localStorage, get it
      if ((cart = [] || localStorage.getItem('cart'))) {
        //converts string to object
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      //push new product to cart
      //it would be an array cos each object is a cart product
      cart.push({
        //spread so you get the product inside and also get count
        ...product,
        count: 1,
      });

      //remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      //save to localStorage
      localStorage.setItem('cart', JSON.stringify(unique));

      setTooltip('Added');
      ///add to redux state
      dispatch({ type: 'ADD_TO_CART', payload: unique });
      dispatch({ type: 'SET_VISIBLE', payload: true });
    }
  };
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
              <Tooltip title={toolTip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined
                    //doing it this way because of the slug so it does not execute immediately

                    className="text-danger"
                  />
                  <br />
                  Add To Cart
                </a>
              </Tooltip>
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
