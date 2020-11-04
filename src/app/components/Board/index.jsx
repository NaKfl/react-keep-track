import {
  DeleteOutlined,
  EditOutlined,
  FieldTimeOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import Popconfirm from 'app/components/Popconfirm';
import Tooltip from 'app/components/Tooltip';
import React from 'react';
import { StyledBoard } from './styles';

const Board = ({
  name,
  id,
  time,
  handleDelete,
  handleClick,
  handleEdit,
  ...rest
}) => {
  return (
    <StyledBoard
      {...rest}
      actions={[
        <Tooltip placement="bottom" title="Url">
          <LinkOutlined key="url" />
        </Tooltip>,

        <Tooltip placement="bottom" title="Edit">
          <EditOutlined key="edit" onClick={() => handleEdit({ id, name })} />
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
        onClick={handleClick}
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
