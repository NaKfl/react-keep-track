import React from 'react';
import { StyledCard } from './styles';
import { Draggable } from 'react-beautiful-dnd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Card = ({
  columnId,
  handleDeleteCard,
  showEditModal,
  cardId,
  children,
  color,
  cards,
  index,
  ...rest
}) => {
  return (
    <Draggable draggableId={cardId} index={index}>
      {provided => (
        <StyledCard
          {...rest}
          color={color}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  );
};

export default Card;
