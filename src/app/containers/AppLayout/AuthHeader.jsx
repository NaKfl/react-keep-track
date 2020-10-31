import React, { memo } from 'react';
import { StyledHeader } from './styles';
import Menu from 'app/components/Menu';

export const AuthHeader = () => {
  return (
    <StyledHeader>
      <div className="logo" />
    </StyledHeader>
  );
};

export default memo(AuthHeader);
