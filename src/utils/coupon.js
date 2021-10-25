import axios from 'axios';

export const getCoupons = async () =>
  await axios.get(`${process.env.REACT_APP_API}/coupons`);

// coupon is the re.body.coupon at the backend
export const createCoupon = async (coupon, authToken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/coupon`,
    { coupon },
    {
      headers: {
        authToken,
      },
    }
  );

export const removeCoupon = async (couponId, authToken) =>
  await axios.delete(
    `${process.env.REACT_APP_API}/coupon/${couponId}`,

    {
      headers: {
        authToken,
      },
    }
  );
