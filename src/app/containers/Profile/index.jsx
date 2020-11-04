import AddBoardButton from 'app/components/AddBoardButton';
import Board from 'app/components/Board';
import Title from 'app/components/Title';
import moment from 'moment';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledProfile, StyledModal, StyledEditModal } from './styles';
import { useHistory } from 'react-router-dom';

export const Profile = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors, createModal, editModal } = useHooks();
  const { showModal, handleEdit, handleDelete } = handlers;
  const { boards, editedBoard } = selectors;
  const history = useHistory();

  return (
    <StyledProfile>
      <Title>Profile </Title>
    </StyledProfile>
  );
};

export default memo(Profile);
