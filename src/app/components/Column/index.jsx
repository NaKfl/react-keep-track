import React from 'react';
import Card from 'app/components/Card';
import { StyledColumn, StyledColumnTitle, StyledAddButton } from './styles';

const Column = ({
  showCreateModal,
  handleDeleteCard,
  id,
  name,
  color,
  cards,
  ...rest
}) => {
  return (
    <StyledColumn {...rest}>
      <StyledColumnTitle color={color}>{name}</StyledColumnTitle>
      <StyledAddButton onClick={() => showCreateModal({ id, cards })}>
        +
      </StyledAddButton>
      <div className="cards">
        {cards.map(({ _id, content }) => (
          <Card
            columnId={id}
            columnCards={cards}
            cardId={_id}
            color={color}
            cards={cards}
            handleDeleteCard={handleDeleteCard}
          >
            {content}
          </Card>
        ))}
      </div>
    </StyledColumn>
  );
};

export default Column;
