import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import AdminProductCard from '../components/cards/AdminProductCard';
import AdminNav from '../components/nav/AdminNav';
import { getProductsByCount, removeProduct } from '../utils/product';
import { messageDisplay } from '../utils/toastMessage';
import { useSelector } from 'react-redux';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  let count = 100;

  const loadAllProducts = async () => {
    try {
      setLoading(true);
      const value = await getProductsByCount(count);

      setProducts(value.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  const handleRemove = (slug) => {
    let answer = window.confirm('Are you sure?');
    if (answer) {
      // console.log('send del req', slug);

      removeProduct(slug, user.token)
        .then((res) => {
          messageDisplay(`${res.data.title} is deleted successfully`);
          loadAllProducts();
        })
        .catch((err) => {
          if (err.response.status === 400) messageDisplay('Error');
          console.log(err);
        });
    }
  };

  const productTitle = () => {
    return <h4> All Products</h4>;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">...loadingg</h4>
          ) : (
            <h4>{productTitle()}</h4>
          )}

          <div className="row">
            {' '}
            {products.map((p) => (
              <div className="col-md-4" key={p._id}>
                <AdminProductCard product={p} handleRemove={handleRemove} />
              </div>
            ))}{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
