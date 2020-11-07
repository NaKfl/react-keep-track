import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { makeSelectDashboardBoards } from './selectors';
import { actions } from './slice';
import Form from 'app/components/Form';

const useHooks = () => {
  const boards = useSelector(makeSelectDashboardBoards);
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
    },
    editModal: {
      visible: editModalVisible,
      onFinish: onEditFinish,
      form: editForm,
      onCancel: hideEditModal,
    },
  };
};

export default useHooks;
