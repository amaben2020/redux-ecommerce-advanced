import { useState, useEffect } from 'react';
import AdminNav from './../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../utils/product';
import { initialState } from './ProductValues.ts';
import { messageDisplay } from '../utils/toastMessage';
import ProductCreateForm from '../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../utils/category';

const ProductCreate = ({ history }) => {
  const [values, setValues] = useState(initialState);

  const { user } = useSelector((state) => ({ ...state }));

  const [categories, setCategories] = useState([]);

  const [subOptions, setSubOptions] = useState([]);

  useEffect(() => {
    loadAllCategories();
  }, []);

  const loadAllCategories = async () => {
    const value = await getCategories();

    //giving categories the array valus so it could be associated
    setValues({ ...values, categories: value.data });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        window.alert(`${res.data.title} is created`);
        //doing this to clear the select options
        window.location.reload();
        // messageDisplay('Successfully created');
        //history.push('/admin/dashboard');
      })
      .catch((error) => {
        //how to get error data using axios
        toast.error(error.response.data.error);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    //console.log(e.target.name, 'name handler', e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log('SUBS OPTION ON CATEGORY CLICK,', res);
      setSubOptions(res.data);
    });

    console.log('Clicked category', e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>{' '}
        <div className="col-md-10">
          <h4>Product create</h4>
          {JSON.stringify(values.categories)}
          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            values={values}
            handleCategoryChange={handleCategoryChange}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
