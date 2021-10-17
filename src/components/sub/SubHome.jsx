import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/cards/ProductCard';
import { getSub } from '../../utils/sub';
const SubHome = ({ match }) => {
  //Keep this tips in mind
  //sub is only one hence the use of Object
  const [sub, setsub] = useState({});

  //products is more than one hence the need for an array to group the list
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug, user.token).then((c) => {
      setsub(c.data.sub);
      setProducts(c.data.products);
      setLoading(false);
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
              {products.length} Products in {sub.name} sub
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

export default SubHome;
