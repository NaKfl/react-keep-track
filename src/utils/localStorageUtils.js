import moment from 'moment';
import isNil from 'lodash/fp/isNil';
const AUTH_INFO_KEY = 'AuthenticationInfo';

export const storeAuthInfo = authInfo => {
  localStorage.setItem(AUTH_INFO_KEY, JSON.stringify(authInfo));
};

export const isValidAuthInfo = authInfo => {
  const { expiresIn } = authInfo.token;
  return moment(expiresIn) >= moment();
};

export const getAuthInfo = () => {
  try {
    const authInfo = JSON.parse(localStorage.getItem(AUTH_INFO_KEY));
    if (!isNil(authInfo) && isValidAuthInfo(authInfo)) {
      return authInfo;
    }
    return null;
  } catch (error) {
    console.log('Error: ', error);
    return null;
  }
};

export const getAccessToken = () => {
  const authInfo = getAuthInfo();
  return !isNil(authInfo) ? authInfo.token.accessToken : '';
};

export const getRefreshToken = () => {
  const authInfo = getAuthInfo();
  return !isNil(authInfo) ? authInfo.token.refreshToken : '';
};

export const getEmailUser = () => {
  const authInfo = getAuthInfo();
  return !isNil(authInfo) ? authInfo.user.email : '';
};

export const isAuthenticated = () => {
  const authInfo = getAuthInfo();
  return !isNil(authInfo);
};

export const removeAuthInfo = () => localStorage.removeItem(AUTH_INFO_KEY);
