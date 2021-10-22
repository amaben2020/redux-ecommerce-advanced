import { useState, useEffect } from 'react';
import { fetchProductsByFilter, getProductsByCount } from '../utils/product';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { Menu, Radio, Slider } from 'antd';
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { getCategories } from '../utils/category';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import Star from '../components/forms/Star';
import { getSubs } from '../utils/sub';
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState();
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState('');
  const [brands, setBrands] = useState([
    'Apple',
    'Samsung',
    'Lenovo',
    'Asus',
    'Microsoft',
  ]);
  const [brand, setBrand] = useState('');
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ]);
  const [color, setColor] = useState('');

  const [shipping, setShipping] = useState('');

  //state.search is the store name of the reducer, while state.search.text is the payload you search products with
  let { text } = useSelector((state) => state.search.text);
  const { SubMenu, ItemGroup } = Menu;
  let dispatch = useDispatch();

  //load products on page load
  const loadAllProducts = (number, setter) => {
    getProductsByCount(number).then((p) => {
      setter(p.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadAllProducts(12, setProducts);

    //fetch categories
    const getAllCategories = async (promise) => {
      try {
        const value = await promise;
        setCategories(value.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCategories(getCategories());

    //fetching the subs and putting them in state
    getSubs().then((res) => setSubs(res.data));
  }, []);

  //  function to query database
  const fetchProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const fetchProductsBySearch = () => {
    return fetchProducts({ query: text });
  };
  console.log('bySearch', fetchProductsBySearch());
  // load products on user search input
  //second useEffect ignores the first one when the text is entered
  //you are pushed to ?enteredText
  useEffect(() => {
    if (text) {
      //WAIT FOR 3S BEFORE EXECUTING THE fn
      const delayed = setTimeout(fetchProductsBySearch, 300);
      return () => clearTimeout(delayed);
    } else {
      //reload the products if no input text
      loadAllProducts();
    }
  }, [text]);

  useEffect(() => {
    //when the ok state changes, we fetch products based on price afteer 3ms
    console.log(ok, 'okay to make request based on price');
    //now sending price to the endpoint

    fetchProducts({ price });
  }, [ok, price]);

  const handleSlider = (value) => {
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setPrice(value);
    setCategoryIds([]);
    setStar('');
    setSub('');
    setBrand('');
    //update the value ok in the state, stops user from making so many requests
    setTimeout(() => {
      setOk(!ok);
    }, 300);

    //Optional but unprofessional
    // loadAllProducts();
  };

  //Load products based on category
  //show categories in a list of checkbox; value is what you are retrieving
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  //handle checkbox fn; when users click here, other search filters must be reset
  const handleCheck = (e) => {
    dispatch({ type: ' SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setStar('');
    setSub('');
    setBrand('');
    setShipping('');
    console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    //gets the index of the selected element i.e idx:  2, 0, -1 ... or -1
    let foundInTheState = inTheState.indexOf(justChecked);
    console.log(foundInTheState);
    //if not found return -1 else return index

    //user havent checked that category yet
    if (foundInTheState === -1) {
      //push the newly checked id to the state
      inTheState.push(justChecked);
    } else {
      //if found, remove one item from idx

      //start deleting from the idex that was there before
      inTheState.splice(foundInTheState, 1);
    }
    //contains no duplicate of what the user clicked
    setCategoryIds(inTheState);
    fetchProducts({ category: inTheState });
  };

  const handleStarClick = (num) => {
    dispatch({ type: ' SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub('');
    setBrand('');
    fetchProducts({ stars: num });
    setShipping('');
  };

  const showStars = () => {
    return (
      <div className="pr-4 pl-4 pb-2">
        <div>
          <Star starClick={handleStarClick} numberOfStars={5} />
        </div>
        <div>
          <Star starClick={handleStarClick} numberOfStars={4} />
        </div>

        <div>
          <Star starClick={handleStarClick} numberOfStars={3} />
        </div>

        <div>
          {' '}
          <Star starClick={handleStarClick} numberOfStars={2} />
        </div>
        <div>
          {' '}
          <Star starClick={handleStarClick} numberOfStars={1} />
        </div>
      </div>
    );
  };

  //show products  by sub categories
  const showSubs = () =>
    subs.map((s) => (
      <div
        className="p-1 m-1 badge badge-secondary"
        onClick={() => handleSub(s)}
        style={{ cursor: 'pointer' }}
        key={s._id}
      >
        {' '}
        {s.name}{' '}
      </div>
    ));

  //This function simply sends all the sub categories to backend so we can get the sub categories
  const handleSub = (sub) => {
    console.log('Sub', sub);
    setSub(sub);
    dispatch({ type: ' SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    setBrand('');
    fetchProducts({ sub });
    setShipping('');
  };

  //show products based on brands name
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        value={b}
        name={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-1 pr-4"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    setSub('');
    dispatch({ type: ' SEARCH_QUERY', payload: { text: '' } });
    setPrice([0, 0]);
    setStar('');
    setBrand(e.target.value);
    fetchProducts({ brand: e.target.value });
    setShipping('');
  };

  const showColors = () => {
    return colors.map((c) => (
      <Radio checked={c === color} value={c} onChange={handleColor}>
        {c}
      </Radio>
    ));
  };

  const myBrandFetcher = async (param) => {
    try {
      const value = await fetchProductsByFilter(param);
      return value;
    } catch (error) {
      console.log(error);
    }
  };

  const handleColor = (e) => {
    console.log(e.target.value);
    setColor(e.target.value);
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setBrand('');
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    myBrandFetcher({ color });
    setShipping('');
  };

  const showShipping = () => (
    <>
      <Checkbox
        onChange={handleShippingChange}
        value="Yes"
        checked={shipping === 'Yes'}
        className="pb-2 pl-4 pr-4"
      >
        Yes
      </Checkbox>
      <Checkbox
        onChange={handleShippingChange}
        value="No"
        checked={shipping === 'No'}
        className="pb-2 pl-4 pr-4"
      >
        No
      </Checkbox>
    </>
  );

  const handleShippingChange = (e) => {
    setColor('');
    dispatch({ type: 'SEARCH_QUERY', payload: { text: '' } });
    setBrand('');
    setPrice([0, 0]);
    setStar('');
    setCategoryIds([]);
    console.log(e.target.value);
    setShipping(e.target.value);
    fetchProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 pt-2">
          <h4>Search/Filter</h4>
          <hr />
          <Menu mode="inline" defaultOpenKeys={['1', '2', '3', '4', '5']}>
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

            {/**Category */}
            <SubMenu
              key="2"
              title={
                <span className="h6">
                  {' '}
                  <DownSquareOutlined /> Categories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showCategories()}</div>
            </SubMenu>

            {/**Stars */}
            <SubMenu
              key="3"
              title={
                <span className="h6">
                  {' '}
                  <StarOutlined /> Star
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showStars()}</div>
            </SubMenu>

            {/**Sub Category */}
            <SubMenu
              key="4"
              title={
                <span className="h6">
                  {' '}
                  <DownSquareOutlined /> Sub Categories
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }}>{showSubs()}</div>
            </SubMenu>

            {/**Brands */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  {' '}
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>

            {/**Color */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  {' '}
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

            {/**Shipping */}
            <SubMenu
              key="5"
              title={
                <span className="h6">
                  {' '}
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ marginTop: '-10px' }} className="pr-5">
                {showShipping()}
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
