import { react } from '@babel/types';
import { useState, useEffect } from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, productStar } from '../utils/product';
import { useSelector } from 'react-redux';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));
  console.log(user);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data));
  };

  useEffect(() => {
    loadSingleProduct();
  }, []);

  useEffect(() => {
    //if product already has rating
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (element) => element.postedBy.toString() === user._id.toString()
      );
      console.log('existing', existingRatingObject);
      existingRatingObject && setStar(existingRatingObject.star); //currentUser's star
    }
  });

  //newRating is 1,2,...5
  const onStarClick = (newRating, name) => {
    //very simple
    setStar(newRating);
    productStar(name, newRating, user.token)
      .then((res) => {
        console.log(res.data);
        loadSingleProduct(); //if you wanna show updated rating in realtime
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row p-5">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>RELATED Products</h4>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
