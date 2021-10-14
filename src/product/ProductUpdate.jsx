import { useState, useEffect } from 'react';
import AdminNav from './../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct, getProduct, updateProduct } from '../utils/product';

import { getCategories, getCategorySubs } from '../utils/category';
import FileUpload from '../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import ProductUpdateForm from '../components/forms/ProductUpdateForm';

export const initialState = {
  title: ' ',
  description: ' ',
  price: ' ',
  category: '',

  subs: [],
  shipping: 'Yes',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Lenovo', 'Asus', 'Microsoft'],
  quantity: ' ',
  color: ' ',
  brand: ' ',
};

const ProductUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showSub, setShowSub] = useState(false);
  //const {slug} = match.params
  // console.log(slug);

  const [loading, setLoading] = useState(false);

  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);

  const { slug } = useParams();

  const loadProduct = () => {
    return getProduct(slug)
      .then((res) => {
        //load single product using object dest..
        setValues({ ...values, ...res.data });

        //load single product category subs
        getCategorySubs(res.data.category._id).then((res) => {
          setSubOptions(res.data);
          //on first mount, show default subs
          console.log('SUBS', res.data);
        });
        //3. Prepare array of subIds to show as default sub values in antD select
        let arr = [];

        res.data.subs.map((s) => {
          return arr.push(s._id);
        });
        console.log('ARR', arr);
        setArrayOfSubIds((prev) => arr); //required for antD select to work
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const loadCategories = async () => {
    const values = await getCategories();

    setCategories(values.data);
  };

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const handleSubmit = (e) => {
    //
    e.preventDefault();
    setLoading(true);
    //you'll send the arrayOfSubiDS cos it's the updated ones in state

    values.subs = arrayOfSubIds;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(slug, values, user.token)
      .then((res) => {
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push('/admin/products');
      })
      .catch((err) => {
        if (err.response.status === 400) {
          console.log(err);
          toast.error(err.response.data.error);
        }
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    console.log(' Category', e.target.value);
    getCategorySubs(e.target.value).then((res) => {
      console.log('SUBS OPTION ON CATEGORY CLICK,', res);
      setSubOptions(res.data);
    });
    //if user clicks back to roiginal category, show sub category by default
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubIds([]);

    console.log('Clicked category', e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>{' '}
        <div className="col-md-10">
          {loading ? <h4>Loading...</h4> : <h4>Product update</h4>}

          {JSON.stringify(values)}

          <div className="p-3">
            <FileUpload
              values={values}
              setValues={setValues}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            values={values}
            setValues={setValues}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
