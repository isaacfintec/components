import axiosRequest from 'axios';
import { getAuthUser } from '../helpers/auth';

export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://nomisoft.com' : 'http://localhost:1337';
export const baseApiUrl = `${baseUrl}/api`;
export const baseUrlSocket = `${baseUrl}/comments`;
export const baseUrlSocketPayroll = `${baseUrl}/payroll`;

const user = getAuthUser();
if (user) {
  axiosRequest.defaults.headers.common.Authorization = `Token ${user.token}`;
}
axiosRequest.defaults.headers.common['Content-Type'] = 'application/json';
export const axios = axiosRequest;
