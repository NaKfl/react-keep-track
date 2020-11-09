import axios from 'axios';
import isNil from 'lodash/fp/isNil';
import { WEB_API as BASE_URL } from 'configs';
import {
  getAccessToken,
  storeAuthInfo,
  removeAuthInfo,
  getRefreshToken,
  getEmailUser,
} from 'utils/localStorageUtils';

const createClient = baseURL => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAccessToken() ? `Bearer ${getAccessToken()}` : '',
    },
  });

  const interceptor = instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status !== 401) {
        return Promise.reject(error);
      }

      instance.interceptors.response.eject(interceptor);
      axios({
        url: `${BASE_URL}/auth/refresh-token`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email: getEmailUser(),
          refreshToken: getRefreshToken(),
        },
      })
        .then(response => {
          storeAuthInfo(response.data.result);
          error.response.config.headers['Authorization'] =
            'Bearer ' + getAccessToken();
          return axios(error.response.config);
        })
        .catch(error => {
          console.log('error', error);
          removeAuthInfo();
          window.location.replace('/login');
          return Promise.reject(error);
        });
    },
  );

  return instance;
};

const request = (baseURL, options) => {
  const onSuccess = response => response;
  const onError = error => Promise.reject(error.response || error.message);
  const client = createClient(baseURL);
  return client(options).then(onSuccess).catch(onError);
};

export const handleGeneralError = error => {
  if (!isNil(error.response)) {
    return {
      error: error.response
        .clone()
        // json() method returns a promise that resolves with the result as JSON
        .json()
        .catch(() => error.response.text())
        .then(objData => ({
          error: { ...objData, status: error.response.status },
        })),
    };
  }
  return { error };
};

export default request;
