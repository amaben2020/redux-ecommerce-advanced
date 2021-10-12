import { useEffect, useState } from 'react';
import AdminProductCard from '../../components/cards/AdminProductCard';
import AdminNav from '../../components/nav/AdminNav';
import { getProductsByCount } from '../../utils/product';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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
                <AdminProductCard product={p} />
              </div>
            ))}{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
