import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getBoardInfo = id => {
  return request(BASE_URL, {
    url: `boards/${id}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const getBoardDetail = id => {
  return request(BASE_URL, {
    url: `columns/${id}`,
    method: 'GET',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const createCard = ({ updatedColumn, content }) => {
  return request(BASE_URL, {
    url: `columns/${updatedColumn.id}`,
    method: 'PUT',
    data: { updatedColumn, content },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const deleteCard = ({ updatedColumn }) => {
  return request(BASE_URL, {
    url: `columns/${updatedColumn.id}`,
    method: 'PUT',
    data: { updatedColumn },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const editCard = ({ data }) => {
  return request(BASE_URL, {
    url: `cards/${data.id}`,
    method: 'PUT',
    data: { content: data.content },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};

export const updateIndexCard = ({ updatedColumn }) => {
  return request(BASE_URL, {
    url: `columns/${updatedColumn.id}`,
    method: 'PUT',
    data: { updatedColumn },
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
