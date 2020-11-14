import Form from 'app/components/Form';
import useActions from 'hooks/useActions';
import get from 'lodash/fp/get';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ACTION_STATUS } from 'utils/constants';
import { notifyError, notifySuccess } from 'utils/notify';
import {
  makeSelectBoardDetailData,
  makeSelectBoardDetailError,
  makeSelectBoardDetailInfo,
  makeSelectBoardDetailStatusCreate,
  makeSelectBoardDetailStatusDelete,
  makeSelectBoardDetailStatusEdit,
} from './selectors';
import { actions } from './slice';

export const useHooks = id => {
  const data = useSelector(makeSelectBoardDetailData);
  const info = useSelector(makeSelectBoardDetailInfo);

  const {
    getBoardInfo,
    getBoardDetail,
    createCard,
    deleteCard,
    editCard,
    updateIndexCard,
  } = useActions(
    {
      getBoardInfo: actions.getBoardInfo,
      getBoardDetail: actions.getBoardDetail,
      createCard: actions.createCard,
      deleteCard: actions.deleteCard,
      editCard: actions.editCard,
      updateIndexCard: actions.updateIndexCard,
    },
    [actions],
  );

  useEffect(() => {
    getBoardInfo(id);
    getBoardDetail(id);
  }, [getBoardInfo, getBoardDetail, id]);

  const [createModalVisible, setCreateModalVisible] = useState(false);

  const [updatedColumn, setUpdatedColumn] = useState({});

  const [createForm] = Form.useForm();

  const showCreateModal = useCallback(
    column => {
      setUpdatedColumn(column);
      setCreateModalVisible(true);
    },
    [setCreateModalVisible, setUpdatedColumn],
  );

  const hideCreateModal = useCallback(() => {
    setCreateModalVisible(false);
  }, [setCreateModalVisible]);

  const onCreateFinish = useCallback(
    ({ content }) => {
      createCard({ id, updatedColumn, content });
      hideCreateModal();
      createForm.resetFields();
    },
    [hideCreateModal, updatedColumn, createForm, id, createCard],
  );

  const handleDeleteCard = useCallback(
    ({ columnId, cardId, cards }) => {
      cards = cards.map(card => card._id);
      cards.splice(cards.indexOf(cardId), 1);
      deleteCard({ id, updatedColumn: { id: columnId, cards } });
    },
    [id, deleteCard],
  );

  const [editModalVisible, setEditModalVisible] = useState(false);

  const [editedCard, setEditedCard] = useState(null);

  const hideEditModal = useCallback(() => {
    setEditModalVisible(false);
  }, [setEditModalVisible]);

  const showEditModal = useCallback(
    editedCard => {
      setEditedCard(editedCard);
      setEditModalVisible(true);
    },
    [setEditedCard, setEditModalVisible],
  );

  const [editForm] = Form.useForm();

  useEffect(() => editForm.resetFields(), [editedCard, editForm]);

  const onEditFinish = useCallback(
    ({ content }) => {
      editCard({ id, data: { id: editedCard.id, content } });
      hideEditModal();
    },
    [hideEditModal, editedCard, id, editCard],
  );

  const handleUpdateIndexCard = useCallback(
    ({ columnId, cardIds }) => {
      updateIndexCard({ id, updatedColumn: { id: columnId, cards: cardIds } });
    },
    [updateIndexCard, id],
  );

  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setColumns(data);
  }, [data, setColumns]);

  const onDragEnd = ({ source, destination }) => {
    if (destination === undefined || destination === null) return null;
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    const start = columns.find(column => column._id === source.droppableId);
    const end = columns.find(column => column._id === destination.droppableId);

    if (start._id === end._id) {
      const clone = start.cards.filter((_, idx) => idx !== source.index);
      clone.splice(destination.index, 0, start.cards[source.index]);

      const newCol = { ...start, cards: clone };

      const ids = clone.map(card => card._id);
      handleUpdateIndexCard({ columnId: start._id, cardIds: ids });

      setColumns(state => {
        const temp = state.filter(({ _id }) => _id !== start._id);
        const pos = state.findIndex(({ _id }) => _id === start._id);
        temp.splice(pos, 0, newCol);
        return temp;
      });
      return null;
    } else {
      const newStartCards = start.cards.filter(
        (_, idx) => idx !== source.index,
      );
      const newColStart = { ...start, cards: newStartCards };

      let ids = newStartCards.map(card => card._id);
      handleUpdateIndexCard({ columnId: start._id, cardIds: ids });

      const newEndCards = [...end.cards];
      newEndCards.splice(destination.index, 0, start.cards[source.index]);
      const newColEnd = { ...end, cards: newEndCards };

      ids = newEndCards.map(card => card._id);
      handleUpdateIndexCard({ columnId: end._id, cardIds: ids });

      setColumns(state => {
        const temp = state.filter(({ _id }) => _id !== start._id);
        const pos = state.findIndex(({ _id }) => _id === start._id);
        temp.splice(pos, 0, newColStart);
        return temp;
      });

      setColumns(state => {
        let temp = state.filter(({ _id }) => _id !== end._id);
        let pos = state.findIndex(({ _id }) => _id === end._id);
        temp.splice(pos, 0, newColEnd);
        return temp;
      });
      return null;
    }
  };

  return {
    handlers: {
      showCreateModal,
      showEditModal,
      handleDeleteCard,
      onDragEnd,
    },
    selectors: { data, info, columns },
    createModal: {
      visible: createModalVisible,
      onCancel: hideCreateModal,
      onFinish: onCreateFinish,
      form: createForm,
    },
    editModal: {
      visible: editModalVisible,
      onCancel: hideEditModal,
      onFinish: onEditFinish,
      form: editForm,
      editedCard,
    },
  };
};

export const useMessage = () => {
  const statusCreate = useSelector(makeSelectBoardDetailStatusCreate);
  const statusEdit = useSelector(makeSelectBoardDetailStatusEdit);
  const statusDelete = useSelector(makeSelectBoardDetailStatusDelete);
  const error = useSelector(makeSelectBoardDetailError);
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
      notifySuccess('Create a card successful');
      reset();
    }
    if (statusEdit === ACTION_STATUS.SUCCESS) {
      notifySuccess('Edit a card successful');
      reset();
    }
    if (statusDelete === ACTION_STATUS.SUCCESS) {
      notifySuccess('Delete a card successful');
      reset();
    }
  }, [statusCreate, statusEdit, statusDelete, reset]);
};

export default useHooks;
