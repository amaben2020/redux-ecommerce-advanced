import { useState, useEffect } from 'react';
import { getCategories, getCategory } from '../../utils/category';
import { useSelector } from 'react-redux';
import Product from '../Product';
import ProductCard from '../../components/cards/ProductCard';
const CategoryHome = ({ match }) => {
  //Keep this tips in mind
  //category is only one hence the use of Object
  const [category, setCategory] = useState({});

  //products is more than one hence the need for an array to group the list
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug, user.token).then((c) => {
      setCategory(c.data.category);
      setProducts(c.data.products);
      setLoading(false);
      // console.log(JSON.stringify(c.data, null, 4));
      // console.log(c.data);
    });
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading....
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in {category.name} category
            </h4>
          )}
        </div>
      </div>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-6" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryHome;
