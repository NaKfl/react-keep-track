import React from 'react';
import { StyledBoard } from './styles';
import {
  CopyOutlined,
  EllipsisOutlined,
  LinkOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import Tooltip from 'app/components/Tooltip';

const Board = ({ name, time }) => {
  return (
    <StyledBoard
      actions={[
        <Tooltip placement="bottom" title="Url">
          <LinkOutlined key="url" />
        </Tooltip>,
        <Tooltip placement="bottom" title="Clone">
          <CopyOutlined key="copy" />
        </Tooltip>,
        <Tooltip placement="bottom" title="More">
          <EllipsisOutlined key="ellipsis" />
        </Tooltip>,
      ]}
    >
      <StyledBoard.Meta
        title={name}
        description={
          <div className="description">
            <FieldTimeOutlined />
            <span className="time">{time}</span>
          </div>
        }
      />
    </StyledBoard>
  );
};

export default Board;
