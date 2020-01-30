import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/users`;

export const index = async (queryParams = '') => {
  try {
    const { data } = await axios.get(`${URL}?${queryParams}`);
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const show = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const store = async (user) => {
  try {
    const { data } = await axios.post(URL, { user });
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const update = async (id, user) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { user });
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const search = async (text) => {
  try {
    const { data } = await axios.post(`${URL}/search`, { text });
    return [...data];
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export default {
  index,
  show,
  store,
  update,
  search,
};
