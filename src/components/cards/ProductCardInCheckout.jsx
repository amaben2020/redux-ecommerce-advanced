import React from 'react';
import ModalImage from 'react-modal-image';
import Product from '../../pages/Product';
import laptop from './../../images/laptop.png';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from '@ant-design/icons';
const ProductCardInCheckout = ({ p }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const dispatch = useDispatch();

  const handleColorChange = (e) => {
    let cart = [];
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
      //getting the cart items som we could iterate over them
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });

      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch({ type: 'ADD_TO_CART', payload: cart });
    }
  };

  const handleQuantityChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    console.log('productQty', count, p.quantity);

    if (count > p.quantity) {
      toast.error(`Max available qty${p.quantity}`);
      return;
    }
    let cart = [];

    if (typeof window !== 'undefined') {
      localStorage.getItem('cart');
      cart = JSON.parse(localStorage.getItem('cart'));
    }

    cart.map((product, index) => {
      if (product._id === p._id) {
        cart[index].count = count;
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: 'ADD_TO_CART', payload: cart });
  };

  const handleRemove = () => {
    //console.log(p._id, 'to remove');

    let cart = [];

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
      }
    }
    //loop through the cart to get the product that matches the product id
    //[1,2,3,4,5]  splice index: what index?  How many? 1
    cart.map((product, index) => {
      if (product._id === p._id) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch({ type: 'ADD_TO_CART', payload: cart });
    toast.error('Item successfully removed from cart');
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: '100px', height: 'auto' }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title}</td>
        <td> ${p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            name="color"
            className="form-control"
            onChange={handleColorChange}
          >
            {p.color ? <option>{p.color}</option> : <option>Select</option>}
            {colors
              .filter((element) => element !== p.color)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </td>
        <td>
          {p.shipping === 'Yes' ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td>
          <CloseOutlined
            className="text-danger"
            style={{ cursor: 'pointer' }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
