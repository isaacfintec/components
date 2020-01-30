import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/tickets`;

export const index = async () => {
  try {
    const { data } = await axios.get(URL);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const show = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const store = async (ticket) => {
  try {
    const { data } = await axios.post(URL, ticket);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const update = async (id, ticket) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, ticket);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const destroy = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const storeComment = async (id, comment) => {
  try {
    const { data } = await axios.post(`${URL}/${id}/comments`, comment);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export default {
  index,
  show,
  store,
  update,
  destroy,
  storeComment,
};
