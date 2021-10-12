import { useState, useEffect } from 'react';
import AdminNav from './../components/nav/AdminNav';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createProduct } from '../utils/product';
import { initialState } from './ProductValues.ts';
import ProductCreateForm from '../components/forms/ProductCreateForm';
import { getCategories, getCategorySubs } from '../utils/category';
import FileUpload from '../components/forms/FileUpload';
import { LoadingOutlined } from '@ant-design/icons';

const ProductUpdate = ({ history }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>{' '}
        <div className="col-md-10">
          <h4>Product create</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
