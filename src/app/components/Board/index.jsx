import React from 'react';
import { StyledBoard } from './styles';
import {
  CopyOutlined,
  EllipsisOutlined,
  LinkOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';

const Board = ({ title, description }) => {
  return (
    <StyledBoard
      actions={[
        <LinkOutlined key="url" />,
        <CopyOutlined key="copy" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <StyledBoard.Meta
        title={title}
        description={
          <div className="description">
            <FieldTimeOutlined />
            <span className="time">{description}</span>
          </div>
        }
      />
    </StyledBoard>
  );
};

export default Board;
