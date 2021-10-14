import { useEffect, useState } from 'react';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../utils/product';
import { Pagination } from 'antd';
const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //current page i.e 1 or 2, 3 ...
  const [page, setPage] = useState(1);

  //number of items to be displayed
  const [itemCount, setItemCount] = useState(3);

  //total products number in dbase
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => {
      setProductsCount(res.data);
    });
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts('createdAt', 'desc', page)
      .then((res) => {
        console.log(res);
        setLoading(false);
        //@ts-ignore
        setProducts(res.data);
      })
      .catch();
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / itemCount) * 10}
            onChange={(value) => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};

export default NewArrivals;
