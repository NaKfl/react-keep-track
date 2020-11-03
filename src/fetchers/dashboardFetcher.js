import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getBoards = () => {
  return request(BASE_URL, {
    url: 'boards',
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const createBoard = payload => {
  return request(BASE_URL, {
    url: 'boards',
    method: 'POST',
    data: payload,
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const deleteBoard = id => {
  return request(BASE_URL, {
    url: `boards/${id}`,
    method: 'DELETE',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const editBoard = ({ id, name }) => {
  return request(BASE_URL, {
    url: `boards/${id}`,
    method: 'PUT',
    data: { name },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
