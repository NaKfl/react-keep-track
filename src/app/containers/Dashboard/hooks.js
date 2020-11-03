import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { makeSelectDashboardBoards } from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';

const useHooks = () => {
  const boards = useSelector(makeSelectDashboardBoards);
  const { getBoards, createBoard, deleteBoard } = useActions(
    {
      getBoards: actions.getBoards,
      createBoard: actions.createBoard,
      deleteBoard: actions.deleteBoard,
    },
    [actions],
  );

  useEffect(() => getBoards(), [getBoards]);

  const [visible, setVisible] = useState(false);

  const showModal = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  const hideModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  const [form] = Form.useForm();

  const onFinish = useCallback(
    values => {
      createBoard(values);
      hideModal();
      form.resetFields();
    },
    [createBoard, hideModal, form],
  );

  const handleDelete = useCallback(
    id => {
      deleteBoard(id);
    },
    [deleteBoard],
  );

  return {
    handlers: { showModal, handleDelete },
    selectors: {
      boards,
    },
    modal: {
      visible,
      onFinish,
      form,
      onCancel: hideModal,
    },
  };
};

export default useHooks;
