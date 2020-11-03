import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import { makeSelectRegisterStatus, makeSelectRegisterError } from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import get from 'lodash/fp/get';
import { notifyError, notifySuccess } from 'utils/notify';

export const useHooks = () => {
  const history = useHistory();
  const { register, reset } = useActions(
    { register: actions.register, reset: actions.reset },
    [actions],
  );
  const status = useSelector(makeSelectRegisterStatus);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      history.push('/login');
      reset();
    }
  }, [status, reset, history]);

  const onFinish = useCallback(
    values => {
      delete values.confirm;
      register(values);
    },
    [register],
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
  const status = useSelector(makeSelectRegisterStatus);
  const error = useSelector(makeSelectRegisterError);

  useEffect(() => {
    if (error && get('message', error)) {
      notifyError(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (status === ACTION_STATUS.SUCCESS) {
      notifySuccess('Register successful');
    }
  }, [status]);
};

export default useHooks;
