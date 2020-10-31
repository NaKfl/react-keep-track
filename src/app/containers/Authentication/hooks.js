import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import {
  makeSelectIsAuthenticated,
  makeSelectAuthenticationStatus,
  makeSelectAuthenticationError,
} from './selectors';

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
    selectors: {},
  };
};

export default useHooks;
