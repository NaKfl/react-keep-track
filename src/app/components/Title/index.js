import React from 'react';
import { StyledTitle } from './styles';

const Title = ({ children }) => {
  return <StyledTitle level={2}>{children}</StyledTitle>;
};

export default Title;
