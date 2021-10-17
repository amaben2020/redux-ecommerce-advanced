import { react } from '@babel/types';
import { useState, useEffect } from 'react';
import SingleProduct from '../components/cards/SingleProduct';
import { getProduct, getRelated, productStar } from '../utils/product';
import { useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';

//This is a parent component
const Product = ({ match }) => {
  //better for handling complex json responses
  const [data, setData] = useState({ prod: {} });
  // const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  console.log('related', related);

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => {
      let myData = res.data;
      setData({ prod: myData });
      // setProduct(res.data);
      //load related
      console.log('seeing what data looks like', res);
      //The related endpoint uses the product's id to fetch products in same category as it
      getRelated(res.data._id).then((res) => setRelated(res.data));
    });
  };

  useEffect(() => {
    loadSingleProduct();
  }, []);

  useEffect(() => {
    //if product already has rating
    if (data.prod.ratings && user) {
      let existingRatingObject = data.prod.ratings.find(
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
        loadSingleProduct(); //if you wanna show updated rating in realtime i.e reloading data
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={data.prod}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row p-5">
        <div className="col text-center pt-5 pb-5">
          <hr />
          <h4>RELATED Products</h4>

          <div className="row">
            <div className="row pb-5">
              {related.length
                ? related.map((related) => (
                    <div key={related._id} className="col-md-4">
                      <ProductCard product={related} />
                    </div>
                  ))
                : 'No products found'}
            </div>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};

export default Product;
