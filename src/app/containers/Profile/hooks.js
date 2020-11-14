import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { notifyError, notifySuccess } from 'utils/notify';
import get from 'lodash/fp/get';
import {
  makeSelectProfileInfo,
  makeSelectProfileError,
  makeSelectEditProfileStatus,
} from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';
import { getAuthInfo, removeAuthInfo } from 'utils/localStorageUtils';
import { useLogout } from 'app/containers/Authentication/hooks';

const useHooks = () => {
  const { onLogout } = useLogout().handlers;
  const AuthenticationInfo = getAuthInfo();
  let id = '';
  if (AuthenticationInfo && AuthenticationInfo.user) {
    id = AuthenticationInfo.user._id;
  }

  let info = useSelector(makeSelectProfileInfo);
  const statusUpdate = useSelector(makeSelectEditProfileStatus);

  info = { ...info, password: undefined, confirm: undefined };

  const { getProfile, editProfile } = useActions(
    {
      getProfile: actions.getProfile,
      editProfile: actions.editProfile,
    },
    [actions],
  );

  useEffect(() => getProfile(id), [getProfile]);

  const [isDisabled, setIsDisabled] = useState(true);

  const onFinish = useCallback(
    values => {
      delete values.email;
      delete values.confirm;
      editProfile({ id, ...values });
      setIsDisabled(true);
      if (values.password) {
        onLogout();
      }
    },
    [id, editProfile, setIsDisabled, onLogout],
  );

  const [form] = Form.useForm();

  useEffect(() => form.resetFields(), [info, form]);

  return {
    handlers: { onFinish, setIsDisabled },
    selectors: {
      info,
      isDisabled,
      form,
      loading: statusUpdate === ACTION_STATUS.PENDING,
    },
  };
};

export const useMessage = () => {
  const statusUpdate = useSelector(makeSelectEditProfileStatus);
  const error = useSelector(makeSelectProfileError);

  const { reset } = useActions(
    {
      reset: actions.reset,
    },
    [actions],
  );

  useEffect(() => {
    if (error && get('message', error)) {
      notifyError(error.message);
      reset();
    }
  }, [error, reset]);

  useEffect(() => {
    if (statusUpdate === ACTION_STATUS.SUCCESS) {
      notifySuccess('Update user profile successfully');
      reset();
    }
  }, [statusUpdate, reset]);
};

export default useHooks;
