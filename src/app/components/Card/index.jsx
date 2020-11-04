import React from 'react';
import { StyledCard } from './styles';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Card = ({
  columnId,
  handleDeleteCard,
  showEditModal,
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
        <EditOutlined
          onClick={() => showEditModal({ content: children, id: cardId })}
        />
        <DeleteOutlined
          onClick={() => handleDeleteCard({ columnId, cardId, cards })}
        />
      </div>
    </StyledCard>
  );
};

export default Card;
