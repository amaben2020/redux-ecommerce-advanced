import { useEffect, useState } from 'react';
import LoadingCard from '../cards/LoadingCard';
import ProductCard from '../cards/ProductCard';
import { getProducts, getProductsCount } from '../../utils/product';
import { Pagination } from 'antd';
const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  //current page i.e 1 or 2, 3 ...
  const [page, setPage] = useState(1);

  //number of items to be displayed
  const [itemCount, setItemCount] = useState(3);

  //total products number in dbase i.e 9, 10 ,11 ... total products
  const [productsCount, setProductsCount] = useState(0);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    const getTotalProducts = async () => {
      try {
        const val = await getProductsCount();
        setProductsCount(val.data);
      } catch (error) {
        console.log(error);
      }
    };
    getTotalProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    //sort, order, limit
    getProducts('sold', 'desc', page)
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

        <div>
          <Pagination
            total={(productsCount / itemCount) * 10}
            current={page}
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </>
  );
};

export default BestSellers;
