import AddBoardButton from 'app/components/AddBoardButton';
import Board from 'app/components/Board';
import Title from 'app/components/Title';
import moment from 'moment';
import React, { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import useHooks, { useMessage } from './hooks';
import saga from './saga';
import { reducer, sliceKey } from './slice';
import { StyledDashboard, StyledModal, StyledEditModal } from './styles';
import { useHistory } from 'react-router-dom';

export const Dashboard = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors, createModal, editModal } = useHooks();
  const { showModal, handleEdit, handleDelete } = handlers;
  const { boards, editedBoard } = selectors;
  const history = useHistory();
  useMessage();

  return (
    <StyledDashboard>
      <Title>My boards</Title>
      <div className="list">
        <AddBoardButton onClick={showModal} />
        {boards.map(board => {
          const { _id, name, createAt } = board;
          return (
            <Board
              key={_id}
              id={_id}
              name={name}
              time={moment(createAt).format('D MMMM')}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleClick={() => history.push(`/dashboard/${_id}`, { board })}
            />
          );
        })}
      </div>
      <StyledModal {...createModal} />
      <StyledEditModal {...editModal} editedBoard={editedBoard} />
    </StyledDashboard>
  );
};

export default memo(Dashboard);
