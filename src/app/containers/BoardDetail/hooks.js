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

  const { getBoardInfo, getBoardDetail, createCard, deleteCard } = useActions(
    {
      getBoardInfo: actions.getBoardInfo,
      getBoardDetail: actions.getBoardDetail,
      createCard: actions.createCard,
      deleteCard: actions.deleteCard,
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

  return {
    handlers: { showCreateModal, handleDeleteCard },
    selectors: { data, info },
    createModal: {
      visible: createModalVisible,
      onCancel: hideCreateModal,
      onFinish: onCreateFinish,
      form: createForm,
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
