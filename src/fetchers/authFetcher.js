import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const login = payload => {
  return request(BASE_URL, {
    url: 'auth/login',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const register = payload => {
  return request(BASE_URL, {
    url: 'auth/register',
    method: 'POST',
    data: {
      ...payload,
    },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
