import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DeleteOutlined } from '@ant-design/icons';
import AdminNav from '../../../components/nav/AdminNav';
import { createCoupon, getCoupons, removeCoupon } from '../../../utils/coupon';
const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const loadCoupons = () => {
    return getCoupons()
      .then((res) => setCoupons(res.data))
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    //console.table(name, expiry, discount);

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName('');
        setDiscount('');
        setExpiry('');
        toast.success(`${res.data.name} is created`);
        loadCoupons();
      })
      .catch((err) => console.log(err));
  };

  const handleRemove = (couponId) => {
    if (window.confirm('Delete ?')) {
      setLoading(true);
      removeCoupon(couponId, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`Coupon ${res.data.name} is deleted`);
          loadCoupons();
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-2" style={{ border: '2px solid gray' }}>
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? <h4>Loading...</h4> : <h4>Coupon</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Discount %
              </label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-muted">
                Expiry
              </label>
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <br />
            <button className="btn btn-primary">Save</button>
          </form>
          <br />
          {coupons.length}{' '}
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.__id}>
                  <td>{c.name} </td>
                  <td>{new Date(c.expiry).toLocaleDateString()} </td>
                  <td>{c.discount} % </td>
                  <td>
                    {' '}
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => handleRemove(c._id)}
                    />{' '}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCouponPage;
