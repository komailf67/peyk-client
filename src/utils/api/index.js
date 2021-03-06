import axios, { Canceler } from 'axios';
import { store } from '../../redux/store';
import AuthActions from '../../redux/actions/authActions';

let cancel = [];

export const cancelAllRequests = () => {
  cancel.map((item) => {
    item[1]();
  });
};

export const baseURL = process.env.NEXT_PUBLIC_API_BASEURL;
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export const token = !!userInfo ? userInfo.token : '';
export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: `Bearer ${token}` },
});

// Add a response interceptor
axiosInstance.interceptors.request.use(
  function (response) {
    if (!!token === false && store.getState()?.auth?.userInfo?.details?.token) {
      response.headers.Authorization = `Bearer ${store.getState()?.auth?.userInfo?.details?.token}`;
    }
    const CancelToken = axios.CancelToken;
    // const access_token = localStorage.getItem('token');
    // if (access_token) {
    // 	response.headers.Authorization = `Bearer ${access_token}`;
    // }

    response.cancelToken = new CancelToken(function executor(c) {
      if (response.url) cancel.push([response.url, c]);
    });
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    if (response?.data?.data?.token) {
      /**
       * userinfo set in this section
       * because after login, when the next api called, localStorage.getItem('access_token) returns null
       */
      store.dispatch({ type: AuthActions.AUTH.USER_INFO.FILL, payload: response.data.data });
      localStorage.setItem('userInfo', JSON.stringify(response.data.data));
    }
    cancel = cancel.filter((fid) => {
      return fid[0] !== response.config.url;
    });
    return response;
  },
  function (error) {
    cancel = cancel.filter((fid) => {
      if (error.response && error.response?.config) {
        return fid[0] !== error.response.config.url;
      }
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
