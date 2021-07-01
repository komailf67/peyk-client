// import { API } from '../utils/http';
import { config } from '../config';
import { axiosInstance } from '../utils/api';
import axios from 'axios';

export const AuthService = {
  // async checkPhone(key, body = {}) {
  //   const res = await API.makePostRequest(`${config.baseUrl}customers/phone/verification/check`, key, body);
  //   return res;
  // },
  async checkPhone(key, body = {}) {
    const res = await axiosInstance.post(`${config.baseUrl}customers/phone/verification/check`, key, body);
    // const res = axios.post(`${config.baseUrl}customers/phone/verification/check`, key, body);
    // return res;
  },
};
