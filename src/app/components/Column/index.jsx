import React from 'react';
import Card from 'app/components/Card';
import { StyledColumn, StyledColumnTitle, StyledAddButton } from './styles';

const Column = ({ showCreateModal, id, name, color, cards, ...rest }) => {
  return (
    <StyledColumn {...rest}>
      <StyledColumnTitle color={color}>{name}</StyledColumnTitle>
      <StyledAddButton onClick={() => showCreateModal({ id, cards })}>
        +
      </StyledAddButton>
      <div className="cards">
        {cards.map(({ content }) => (
          <Card color={color}>{content}</Card>
        ))}
      </div>
    </StyledColumn>
  );
};

export default Column;
