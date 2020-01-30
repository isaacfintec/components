import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/credits`;

export const show = async (id) => {
  const { data } = await axios.get(`${URL}/${id}`);
  return { ...data };
};

export const store = async (credit) => {
  try {
    const { data } = await axios.post(`${URL}`, { credit });
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const approve = async (employeeId, documentsId = '5d7805dffa14c711252622fd') => {
  try {
    const { data } = await axios.get(`${URL}/${employeeId}/documents/${documentsId}/approve`);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const cancel = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}/cancel`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const pendings = async () => {
  try {
    const { data } = await axios.get(`${URL}/pendings`);
    return data;
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export default {
  show,
  store,
  approve,
  cancel,
  pendings,
};
