import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import get from 'lodash/fp/get';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { notifyError, notifySuccess } from 'utils/notify';
import {
  makeSelectDashboardBoards,
  makeSelectDashboardStatusCreate,
  makeSelectDashboardStatusEdit,
  makeSelectDashboardStatusGet,
  makeSelectDashboardStatusDelete,
  makeSelectDashboardError,
} from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';

const useHooks = () => {
  const boards = useSelector(makeSelectDashboardBoards);
  const statusCreate = useSelector(makeSelectDashboardStatusCreate);
  const statusEdit = useSelector(makeSelectDashboardStatusEdit);
  const statusGet = useSelector(makeSelectDashboardStatusGet);
  const { getBoards, createBoard, deleteBoard, editBoard } = useActions(
    {
      getBoards: actions.getBoards,
      createBoard: actions.createBoard,
      deleteBoard: actions.deleteBoard,
      editBoard: actions.editBoard,
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

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editedBoard, setEditedBoard] = useState(null);

  const handleEdit = useCallback(
    editedBoard => {
      setEditModalVisible(true);
      setEditedBoard(editedBoard);
    },
    [setEditModalVisible, setEditedBoard],
  );

  const [editForm] = Form.useForm();

  const hideEditModal = useCallback(() => {
    setEditModalVisible(false);
  }, [setEditModalVisible]);

  const onEditFinish = useCallback(
    values => {
      editBoard({ id: editedBoard.id, name: values.name });
      hideEditModal();
    },
    [editedBoard, hideEditModal, editBoard],
  );

  useEffect(() => editForm.resetFields(), [editedBoard, editForm]);

  return {
    handlers: { showModal, handleEdit, handleDelete },
    selectors: {
      boards,
      editedBoard,
    },
    createModal: {
      visible,
      onFinish,
      form,
      onCancel: hideModal,
      loading:
        statusCreate === ACTION_STATUS.PENDING ||
        statusGet === ACTION_STATUS.PENDING,
    },
    editModal: {
      visible: editModalVisible,
      onFinish: onEditFinish,
      form: editForm,
      onCancel: hideEditModal,
      loading:
        statusEdit === ACTION_STATUS.PENDING ||
        statusGet === ACTION_STATUS.PENDING,
    },
  };
};

export const useMessage = () => {
  const statusCreate = useSelector(makeSelectDashboardStatusCreate);
  const statusEdit = useSelector(makeSelectDashboardStatusEdit);
  const statusDelete = useSelector(makeSelectDashboardStatusDelete);
  const error = useSelector(makeSelectDashboardError);

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
    if (statusCreate === ACTION_STATUS.SUCCESS) {
      notifySuccess('Create a board successful');
      reset();
    }
    if (statusEdit === ACTION_STATUS.SUCCESS) {
      notifySuccess('Edit a board successful');
      reset();
    }
    if (statusDelete === ACTION_STATUS.SUCCESS) {
      notifySuccess('Delete a board successful');
      reset();
    }
  }, [statusCreate, statusEdit, statusDelete, reset]);
};

export default useHooks;
