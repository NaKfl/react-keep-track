import React from 'react';
import { StyledCard } from './styles';

const Card = ({ children, color, ...rest }) => {
  return (
    <StyledCard {...rest} color={color}>
      {children}
    </StyledCard>
  );
};

export default Card;
