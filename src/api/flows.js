import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/flow`;

export const show = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};


export default {
  show,
};
