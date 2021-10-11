import axios from 'axios';

const url = `${process.env.REACT_APP_API}/categories`;

export const getCategories = async () => {
  return await axios.get(url);
};

export const getCategory = async (slug, authtoken) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getCategorySubs = async (_id) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/subs/${_id}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

//takes in slug you wanna update, category is the data you're sending i.e category, authtoken is token
export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
};

export const createCategory = async (category, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/category`, category, {
    headers: {
      authtoken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
};
