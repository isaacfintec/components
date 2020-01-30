import { axios, baseApiUrl } from './config';
import { displayToastApiErrors } from '../helpers/errors';

const URL = `${baseApiUrl}/s3`;

export const getUrlFile = async (url) => {
  try {
    const { data } = await axios.post(`${URL}/getSignedUrl`, { url });
    return { ...data };
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const signFiles = async (files) => {
  try {
    const { data } = await axios.post(`${URL}/signFiles`, { files });
    return [...data];
  } catch (err) {
    displayToastApiErrors(err);
    return null;
  }
};

export const uploadToS3 = async (file, url) => {
  const options = {
    headers: {
      'Content-Type': file.type,
    },
  };

  const token = axios.defaults.headers.common.Authorization;
  delete axios.defaults.headers.common.Authorization;
  const response = await axios.put(url, file, options);
  axios.defaults.headers.common.Authorization = token;
  return response;
};

export default {
  getUrlFile,
  signFiles,
  uploadToS3,
};
