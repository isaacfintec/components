import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/products`;

export const index = async (page = 0, params = '') => {
  try {
    const { data } = await axios.get(`${URL}/page/${page}?${params}`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const store = async (product) => {
  try {
    const { data } = await axios.post(URL, product);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const update = async (id, product) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, product);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const activate = async (id) => {
  try {
    const { data } = await axios.put(`${URL}/${id}/activate`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const desactivate = async (id) => {
  try {
    const { data } = await axios.put(`${URL}/${id}/desactivate`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export default {
  index,
  store,
  update,
  activate,
  desactivate,
};
