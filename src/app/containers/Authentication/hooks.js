import get from 'lodash/fp/get';
import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory, useLocation } from 'react-router-dom';
import {
  makeSelectIsAuthenticated,
  makeSelectAuthenticationStatus,
  makeSelectAuthenticationError,
} from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import { notifyError, notifySuccess } from 'utils/notify';

export const useHooks = () => {
  const history = useHistory();
  const { login } = useActions({ login: actions.login }, [actions]);
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);
  const status = useSelector(makeSelectAuthenticationStatus);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard');
    }
  }, [isAuthenticated, history]);

  const onFinish = useCallback(
    values => {
      login(values);
    },
    [login],
  );

  const onFinishFailed = useCallback(errorInfo => {
    console.log('Failed: ', errorInfo);
  }, []);

  return {
    handlers: { onFinish, onFinishFailed },
    selectors: { status },
  };
};

export const useMessage = () => {
  const status = useSelector(makeSelectAuthenticationStatus);
  const error = useSelector(makeSelectAuthenticationError);

  useEffect(() => {
    if (error && get('message', error)) {
      notifyError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      notifySuccess('Login successful');
    }
  }, [status]);
};

export const useLogout = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { logout } = useActions({ logout: actions.logout });
  const isAuthenticated = useSelector(makeSelectIsAuthenticated);

  useEffect(() => {
    if (!pathname.includes('/login') && !isAuthenticated) {
      history.push('/login');
    }
  }, [isAuthenticated, history, pathname]);

  const onLogout = useCallback(() => {
    logout();
  }, [logout]);

  return {
    handlers: { onLogout },
  };
};

export default useHooks;
