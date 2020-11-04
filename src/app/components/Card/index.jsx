import React from 'react';
import { StyledCard } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Card = ({
  columnId,
  handleDeleteCard,
  cardId,
  children,
  color,
  cards,
  ...rest
}) => {
  return (
    <StyledCard {...rest} color={color}>
      <div className="content">{children}</div>
      <div className="actions">
        <EditOutlined />
        <DeleteOutlined
          onClick={() => handleDeleteCard({ columnId, cardId, cards })}
        />
      </div>
    </StyledCard>
  );
};

export default Card;
