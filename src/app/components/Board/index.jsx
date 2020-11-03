import React from 'react';
import { StyledBoard } from './styles';
import {
  CopyOutlined,
  LinkOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
} from '@ant-design/icons';
import Tooltip from 'app/components/Tooltip';
import Popconfirm from 'app/components/Popconfirm';

const Board = ({ name, id, time, handleDelete, ...rest }) => {
  return (
    <StyledBoard
      {...rest}
      actions={[
        <Tooltip placement="bottom" title="Url">
          <LinkOutlined key="url" />
        </Tooltip>,

        <Tooltip placement="bottom" title="Clone">
          <CopyOutlined key="copy" />
        </Tooltip>,

        <Popconfirm
          title="Are you sure delete this board?"
          onConfirm={() => handleDelete(id)}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip placement="bottom" title="Delete">
            <DeleteOutlined key="delete" />
          </Tooltip>
        </Popconfirm>,
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
