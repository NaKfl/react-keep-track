import React, { useState } from 'react';
import Card from 'app/components/Card';
import { Droppable } from 'react-beautiful-dnd';
import { StyledColumn, StyledColumnTitle, StyledAddButton } from './styles';

const Column = ({
  showCreateModal,
  showEditModal,
  handleDeleteCard,
  handleUpdateIndexCard,
  id,
  name,
  color,
  cards,
  ...rest
}) => {
  return (
    <StyledColumn>
      <StyledColumnTitle color={color}>{name}</StyledColumnTitle>
      <StyledAddButton onClick={() => showCreateModal({ id, cards })}>
        +
      </StyledAddButton>
      <Droppable droppableId={id}>
        {provided => (
          <div
            className="cards"
            {...rest}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map(({ _id, content, isDeleted, createdAt }, index) => (
              <Card
                key={_id}
                showEditModal={showEditModal}
                columnId={id}
                columnCards={cards}
                cardId={_id}
                color={color}
                cards={cards}
                handleDeleteCard={handleDeleteCard}
                index={index}
              >
                {content}
              </Card>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </StyledColumn>
  );
};

export default Column;
