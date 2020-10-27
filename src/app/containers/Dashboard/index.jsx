import React from 'react';
import CommonLayout from 'app/containers/AppLayout/CommonLayout';
import Title from 'app/components/Title';
import AddBoardButton from 'app/components/AddBoardButton';
import Board from 'app/components/Board';
import { StyledDashboard } from './styles';

import moment from 'moment';
import { useInjectReducer, useInjectSaga } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import useHooks from './hooks';

const Dashboard = props => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { handlers, selectors } = useHooks();
  const { boards } = selectors;

  return (
    <CommonLayout>
      <StyledDashboard>
        <Title>My boards</Title>
        <div className="list">
          <AddBoardButton />
          {boards.map(({ _id, name, createAt }) => (
            <Board
              key={_id}
              name={name}
              time={moment(createAt).format('D MMMM')}
            />
          ))}
        </div>
      </StyledDashboard>
    </CommonLayout>
  );
};

export default Dashboard;
