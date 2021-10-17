import { useState, useEffect } from 'react';
import { fetchProductsByFilter, getProductsByCount } from '../utils/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Slider } from 'antd';
import { DollarOutlined } from '@ant-design/icons';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  //state.search is the store name of the reducer, while state.search.text is the payload you search products with
  let { text } = useSelector((state) => state.search.text);

  const { SubMenu, ItemGroup } = Menu;
  let dispatch = useDispatch();
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

  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  // load products on user search input
  //second useEffect ignores the first one when the text is entered
  //you are pushed to ?enteredText
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

  useEffect(() => {
    //when the ok state changes, we fetch products based on price
    console.log(ok, 'okay to make request based on price');
    //now sending price to the endpoint
    fetchProducts({ price });
  }, [ok]);

  const handleSlider = (value) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice(value);
    //update the value ok in the state, stops user from making so many requests
    setTimeout(() => {
      setOk(!ok);
    }, 300);

    //Optional but unprofessional
    // loadAllProducts();
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={['1', '2']}>
            <SubMenu
              key="1"
              title={
                <span className="h6">
                  <DollarOutlined /> Price
                </span>
              }
            >
              <div>
                <Slider
                  className="ml-4 mr-4"
                  tipFormatter={(v) => `$${v}`}
                  range
                  value={price}
                  onChange={handleSlider}
                  max="4999"
                />
              </div>
            </SubMenu>
          </Menu>
        </div>

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
