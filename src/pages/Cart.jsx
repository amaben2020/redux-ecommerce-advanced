import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../utils/user';
const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((acc, elem) => {
      // 0 + 2.. * price
      return acc + elem.count * elem.price;
    }, 0);
  };

  const saveAllToDb = () => {
    //send cart from redux to DBase
    //console.log('cart', JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log('CART POST', res);
        if (res.data.ok) {
          history.push('/checkout');
        }
      })
      .catch((e) => console.log('Catch error', e));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead style={{ boxShadow: '2px 2px 2px 0px gray' }}>
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <h4>Cart {cart.length} product</h4>
      </div>

      <div className="row">
        <div className="col-md-8">
          {!cart.length ? (
            <p>
              No product in cart. <Link to="/shop"> Contnue Shopping. </Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Order Summary</h4>
          <hr />
          <p>Products</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {' '}
                {c.title} X {c.count} = ${c.price * c.count}
              </p>
            </div>
          ))}
          <hr />
          Total : <b>${getTotal()}</b>
          <hr />
          {user ? (
            <button
              disabled={!cart.length}
              onClick={saveAllToDb}
              className="btn btn-sm btn-primary mt-2"
            >
              Proceed to checkout{' '}
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: '/login',
                  state: { from: '/cart' },
                }}
              >
                {' '}
                Login to checkout{' '}
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
