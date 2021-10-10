import axios from 'axios';
const url = `${process.env.REACT_APP_API}/create-or-update-user`;
const url2 = `${process.env.REACT_APP_API}/current-user`;
const url3 = `${process.env.REACT_APP_API}/current-admin`;

export const createOrUpdateUser = async (token) => {
  return await axios.post(
    url,
    {},
    {
      headers: {
        authToken: token,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    url2,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentAdmin = async (authtoken) => {
  return await axios.post(
    url3,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
