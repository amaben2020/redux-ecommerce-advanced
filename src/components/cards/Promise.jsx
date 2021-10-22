import { useEffect, useState } from 'react';
import { getProduct } from '../../utils/product';

const Promise = () => {
  const [product, setProduct] = useState([]);
  const [product2, setProduct2] = useState([]);

  useEffect(() => {
    promiseFunction('microsoft');
    method2();
  }, []);

  //promise resolver method 1
  const promiseFunction = async (text) => {
    try {
      const value = await getProduct(text);
      setProduct(value.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  //promise method 2
  const method2 = () => {
    getProduct('microsoft')
      .then((res) => {
        const { data } = res;
        setProduct2(data);
      })
      .catch();
  };

  return (
    <div>
      <div>{JSON.stringify(product2)}</div>
      {/* {JSON.stringify(product)}
       */}
    </div>
  );
};

export default Promise;
