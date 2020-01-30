import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/groups`;

export const index = async () => {
  try {
    const { data } = await axios.get(URL);
    return [...data];
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

export const store = async (group) => {
  try {
    const { data } = await axios.post(URL, { group });
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const update = async (id, group) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { group });
    return { ...data };
  }

  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const destroy = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return { ...data };
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
  destroy,
};
