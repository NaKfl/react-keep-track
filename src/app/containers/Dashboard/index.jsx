import React from 'react';
import CommonLayout from 'app/containers/AppLayout/CommonLayout';
import Title from 'app/components/Title';
import AddBoardButton from 'app/components/AddBoardButton';
import Board from 'app/components/Board';
import { StyledDashboard } from './styles';

const Dashboard = props => {
  return (
    <CommonLayout>
      <StyledDashboard>
        <Title>My boards</Title>
        <div className="list">
          <AddBoardButton />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
          <Board title="Yesterday" description="26 October" />
        </div>
      </StyledDashboard>
    </CommonLayout>
  );
};

export default Dashboard;
