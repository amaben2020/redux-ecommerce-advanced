import { useState, useEffect } from 'react';
import { fetchProductsByFilter, getProductsByCount } from '../utils/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //state.search is the store name of the reducer, while state.search.text is the payload you search products with
  let { text } = useSelector((state) => state.search.text);

  useEffect(() => {
    loadAllProducts();
  }, []);

  //load products on page load
  const loadAllProducts = () => {
    getProductsByCount(12).then((p) => {
      setProducts(p.data);
      setLoading(false);
    });
  };

  // load products on user search input
  //second useEffect ignores the first one when the text is entered
  useEffect(() => {
    if (text) {
      const delayed = setTimeout(() => {
        fetchProducts({ query: text });
      }, 300);
      return () => clearTimeout(delayed);
    } else {
      if (!text) {
        //reload the products if no input text
        loadAllProducts();
      }
    }
  }, [text]);

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">search / filter / menu</div>

        <div className="col-md-9">
          {loading ? (
            <h4 className="text-danger"> Loading...</h4>
          ) : (
            <h4 className="text-primary"> Products</h4>
          )}

          {products.length < 1 && <p>No products found</p>}

          <div className="row">
            {products.map((p) => (
              <div key={p._id} className="col-md-4 mt-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
