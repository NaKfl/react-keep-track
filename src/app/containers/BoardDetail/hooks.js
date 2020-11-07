import useActions from 'hooks/useActions';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { actions } from './slice';
import { useHistory } from 'react-router-dom';
import {
  makeSelectBoardDetailError,
  makeSelectBoardDetailData,
  makeSelectBoardDetailInfo,
} from './selectors';
import { ACTION_STATUS } from 'utils/constants';
import get from 'lodash/fp/get';
import { notifyError, notifySuccess } from 'utils/notify';
import Form from 'app/components/Form';

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
    [hideCreateModal, updatedColumn, createForm, id],
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
    [setCreateModalVisible, setEditedCard],
  );

  const [editForm] = Form.useForm();

  useEffect(() => editForm.resetFields(), [editedCard, editForm]);

  const onEditFinish = useCallback(
    ({ content }) => {
      editCard({ id, data: { id: editedCard.id, content } });
      hideEditModal();
    },
    [hideCreateModal, editedCard],
  );

  const handleUpdateIndexCard = useCallback(
    ({ columnId, cardIds }) => {
      updateIndexCard({ id, updatedColumn: { id: columnId, cards: cardIds } });
    },
    [updateIndexCard],
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

// export const useMessage = () => {
//   const status = useSelector(makeSelectRegisterStatus);
//   const error = useSelector(makeSelectRegisterError);

//   useEffect(() => {
//     if (error && get('message', error)) {
//       notifyError(error.message);
//     }
//   }, [error]);

//   useEffect(() => {
//     if (status === ACTION_STATUS.SUCCESS) {
//       notifySuccess('Register successful');
//     }
//   }, [status]);
// };

export default useHooks;
