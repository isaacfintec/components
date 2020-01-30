import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/payroll`;

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
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const store = async (payroll) => {
  try {
    const config = {
      headers: {
        'content-Type': 'multipart/form-data',
      },
    };
    const { data } = await axios.post(URL, payroll, config);
    return { ...data };
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const update = async (id, payroll) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, payroll);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const getUrlFile = async (url) => {
  try {
    const { data } = await axios.get(`${url}`);
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
  getUrlFile,
};
