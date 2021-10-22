import { useState } from 'react';
import { Card, Tooltip } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import laptop from './../../images/laptop.png';
import { Link } from 'react-router-dom';
import { showAverage } from '../../utils/rating';
import _ from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
const ProductCard = ({ product }) => {
  const { Meta } = Card;
  const { images, title, slug, description, price } = product;
  const [toolTip, setTooltip] = useState('Add to cart');
  const dispatch = useDispatch();
  const { user, cart } = useSelector((state) => ({ ...state }));

  const handleAddToCart = () => {
    //show tooltip
    setTooltip('Added');
    //create cart array
    let cart = [];
    if (typeof window !== 'undefined') {
      // if cart is in localStorage, get it
      if (localStorage.getItem('cart')) {
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
      dispatch({ type: 'ADD_TO_CART', payload: cart });
      dispatch({ type: 'SET_VISIBLE', payload: true });
    }
  };

  return (
    <>
      <div>
        {product && product.ratings.length > 0 && product.ratings
          ? showAverage(product)
          : 'No rating yet'}
      </div>

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
        ]}
      >
        <Meta
          title={`${title}  --  $${price}`}
          description={`${description && description.substring(0, 40)}...`}
        />
        {product.title}
      </Card>
    </>
  );
};

export default ProductCard;
