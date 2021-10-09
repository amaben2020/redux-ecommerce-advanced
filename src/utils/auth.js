import axios from 'axios';

const url = `${process.env.REACT_APP_API}/create-or-update-user`;

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
