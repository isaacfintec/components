import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/employees`;

export const search = async (req) => {
  try {
    const { data } = await axios.post(`${URL}/search`, req);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

// Buscar empleados con creditos
export const searchById = async (req) => {
  try {
    const { data } = await axios.post(`${URL}/searchByCredit`, req);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

// Buscar empleados con apartados
export const searchPrecredits = async (req) => {
  try {
    const { data } = await axios.post(`${URL}/searchPrecredit`, req);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

export const show = async (id) => {
  const { data } = await axios.get(`${URL}/${id}`);
  return { ...data };
};

export const showWithCredits = async (id) => {
  const { data } = await axios.get(`${URL}/withcredits/${id}`);
  return { ...data };
};

// Apartados
export const waitingCredits = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/waitingCredits`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

// Historial Liquidos
export const creditHistory = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/creditHistory`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

// Monto disponible, monto total
export const credit = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/credit`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

// Subir documentos
export const uploadFiles = async (employeeId, flowId, documents) => {
  try {
    const { data } = await axios.post(`${URL}/${employeeId}/flow/${flowId}/documents`, { documents });
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return err;
  }
};

export default {
  search,
  show,
  waitingCredits,
  creditHistory,
  credit,
  uploadFiles,
  searchById,
  showWithCredits,
  searchPrecredits,
};
