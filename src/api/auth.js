import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

export const fetchLogin = async (credentials) => {
  const user = { user: credentials };
  try {
    const { data } = await axios.post(`${baseApiUrl}/login`, user);
    return { ...data };
  }
  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const fetchRegister = () => { };
