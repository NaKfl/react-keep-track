import React from 'react';
import {
  StyledAddBoardButton,
  StyledAddBoardTitle,
  StyledAddBoardIcon,
} from './styles';

const AddBoardButton = props => {
  return (
    <StyledAddBoardButton>
      <StyledAddBoardIcon />
      <StyledAddBoardTitle>Add board</StyledAddBoardTitle>
    </StyledAddBoardButton>
  );
};

export default AddBoardButton;
