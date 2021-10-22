import axios from 'axios';

export const userCart = async (cart, authToken) => {
  //cart is wrapped in object cos we are accessing it as req.body.cart not just req.body
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const saveUserAddress = async (authToken, address) => {
  //cart is wrapped in object cos we are accessing it as req.body.cart not just req.body
  return await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { address },
    {
      headers: {
        authToken,
      },
    }
  );
};

export const getUserCart = async (authToken) => {
  //cart is wrapped in object cos we are accessing it as req.body.cart not just req.body
  return await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};

export const emptyUserCart = async (authToken) => {
  //cart is wrapped in object cos we are accessing it as req.body.cart not just req.body
  return await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authToken,
    },
  });
};
