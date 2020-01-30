import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

export const fetchHelpmes = async () => {
  try {
    const { data } = await axios.get(`${baseApiUrl}/helpme`);
    return [...data];
  }
  catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const fetchCreateHelpme = () => { };
