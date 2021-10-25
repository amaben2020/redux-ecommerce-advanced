import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  applyCoupon,
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../utils/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState('');
  const dispatch = useDispatch();

  const { user } = useSelector((state) => ({
    ...state,
  }));

  useEffect(() => {
    getUserCart(user?.token)
      .then((res) => {
        console.log('user cart res', JSON.stringify(res.data, null, 4));
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch();
  }, [user?.token]);

  const saveAddressToDb = () =>
    /////////////////////////////////////////
    saveUserAddress(user.token, address)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success('Address saved');
        }
      })
      .catch();

  const emptyCart = () => {
    //remove from redux
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cart');
    }
    //remove from redux
    dispatch({
      type: 'ADD_TO_CART',
      payload: [],
    });
    //remove from b.end
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon('');
      toast.success('Cart is empty, continue shopping');
    });
  };

  const showAddress = () => (
    <>
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.title} ({p.color}) X {p.count} = {p.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => {
    return (
      <>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError('');
          }}
          value={coupon}
        />
        <button onClick={applyDiscountCoupon} className="btn btn-primary mt-3">
          Apply{' '}
        </button>
      </>
    );
  };

  const applyDiscountCoupon = () => {
    applyCoupon(user.token, coupon).then((res) => {
      console.log('coupon', res.data);

      if (res.data) {
        setTotalAfterDiscount(res.data);
        //update redux store
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        //update redux coupon applied
        dispatch({
          type: 'COUPON_APPLIED',
          payload: false,
        });
      }
    });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon ? </h4>
        {showApplyCoupon()}
        <br />
        {discountError && <p className=" bg-danger"> {discountError}</p>}
        <br />
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <hr />
        <p>Products {products.length}</p>
        {showProductSummary()}
        <hr />

        <hr />

        <hr />
        <p>Cart Total: ${total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            {' '}
            Discount applied total payable ${totalAfterDiscount}{' '}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            <button
              className="btn btn-primary"
              disabled={!addressSaved || !products.length}
              onClick={() => history.push('/payment')}
            >
              Place order
            </button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              className="btn btn-primary"
              onClick={emptyCart}
            >
              Empty cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
