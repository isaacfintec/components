import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/employees`;

export const search = async (req) => {
  try {
    const { data } = await axios.post(`${URL}/search`, req);
    return data;
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

// Apartados
export const waitingCredits = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/waitingCredits`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

// Historial Liquidos
export const creditHistory = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/creditHistory`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

// Monto disponible, monto total
export const credit = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/credit`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export default {
  search,
  show,
  waitingCredits,
  creditHistory,
  credit,
};
