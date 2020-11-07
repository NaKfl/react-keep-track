import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getProfile = id => {
  return request(BASE_URL, {
    url: `users/${id}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const editProfile = ({ id, ...rest }) => {
  return request(BASE_URL, {
    url: `users/${id}`,
    method: 'PUT',
    data: rest,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
