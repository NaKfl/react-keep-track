import { WEB_API as BASE_URL } from 'configs';
import request, { handleGeneralError } from './index';

export const getBoards = () => {
  return request(BASE_URL, {
    url: 'boards',
    method: 'get',
  })
    .then(response => response.data)
    .then(data => ({ response: data }))
    .catch(handleGeneralError);
};
